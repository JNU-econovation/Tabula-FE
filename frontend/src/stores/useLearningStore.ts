// stores/learningStore.ts
import { ResultItem } from '@/api/workspace';
import { useCallback } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useMemo } from 'react';

interface WorkspaceData {
  learningResult: ResultItem[];
  isLoading: boolean;
}

interface LearningState {
  workspaceData: Record<string, WorkspaceData>;
  setLearningResult: (workspaceId: string, newList: ResultItem[]) => void;
  addLoadingResult: (
    workspaceId: string,
    taskId: string,
    fileName: string,
  ) => void;
  resetResults: (workspaceId: string) => void;
  completeLoadingResult: (
    workspaceId: string,
    completedResult: ResultItem,
  ) => void;
  initWorkspace: (workspaceId: string) => void;
  clearWorkspace: (workspaceId: string) => void;
}

export const useBaseLearningStore = create<LearningState>()(
  devtools((set) => ({
    workspaceData: {},

    initWorkspace: (workspaceId) => {
      set((state) => ({
        workspaceData: {
          ...state.workspaceData,
          [workspaceId]: {
            learningResult: [],
            isLoading: false,
          },
        },
      }));
    },

    setLearningResult: (workspaceId, newList) => {
      set((state) => ({
        workspaceData: {
          ...state.workspaceData,
          [workspaceId]: {
            ...state.workspaceData[workspaceId],
            learningResult: newList,
            isLoading: false,
          },
        },
      }));
    },

    resetResults: (workspaceId) => {
      set((state) => ({
        workspaceData: {
          ...state.workspaceData,
          [workspaceId]: {
            ...state.workspaceData[workspaceId],
            learningResult: [],
            isLoading: false,
          },
        },
      }));
    },

    addLoadingResult: (workspaceId, taskId, fileName) => {
      set((state) => {
        const workspace = state.workspaceData[workspaceId] || {
          learningResult: [],
          isLoading: false,
        };

        return {
          workspaceData: {
            ...state.workspaceData,
            [workspaceId]: {
              ...workspace,
              learningResult: [
                ...workspace.learningResult,
                {
                  resultId: taskId,
                  resultFileName: fileName,
                  resultImages: [],
                  resultStatus: 'LOADING',
                },
              ],
              isLoading: true,
            },
          },
        };
      });
    },

    completeLoadingResult: (workspaceId, completedResult) => {
      set((state) => {
        const workspace = state.workspaceData[workspaceId] || {
          learningResult: [],
          isLoading: false,
        };

        const updatedResults: ResultItem[] = workspace.learningResult.map(
          (item: ResultItem) =>
            item.resultStatus === 'LOADING'
              ? {
                  ...completedResult,
                  resultStatus: 'COMPLETED',
                }
              : item,
        );

        const hasLoadingItems: boolean = updatedResults.some(
          (item: ResultItem) => item.resultStatus === 'LOADING',
        );

        return {
          workspaceData: {
            ...state.workspaceData,
            [workspaceId]: {
              ...workspace,
              learningResult: updatedResults,
              isLoading: hasLoadingItems,
            },
          },
        };
      });
    },

    clearWorkspace: (workspaceId) => {
      set((state) => {
        const newWorkspaceData = { ...state.workspaceData };
        delete newWorkspaceData[workspaceId];
        return { workspaceData: newWorkspaceData };
      });
    },
  })),
);

// 워크스페이스별 데이터를 가져오는 selector 훅
export const useLearningStore = (workspaceId: string) => {
  // 기본 데이터를 useMemo로 캐싱
  const defaultData = useMemo(
    () => ({
      learningResult: [],
      isLoading: false,
    }),
    [],
  );

  // 워크스페이스 데이터 selector
  const workspaceData = useBaseLearningStore(
    useCallback(
      (state) => state.workspaceData[workspaceId] || defaultData,
      [workspaceId, defaultData],
    ),
  );

  // 액션들 selector - 이것도 useMemo로 캐싱
  const actions = useMemo(
    () => ({
      setLearningResult: (newList: ResultItem[]) =>
        useBaseLearningStore.getState().setLearningResult(workspaceId, newList),
      addLoadingResult: (taskId: string, fileName: string) =>
        useBaseLearningStore
          .getState()
          .addLoadingResult(workspaceId, taskId, fileName),
      resetResults: () =>
        useBaseLearningStore.getState().resetResults(workspaceId),
      completeLoadingResult: (completedResult: ResultItem) =>
        useBaseLearningStore
          .getState()
          .completeLoadingResult(workspaceId, completedResult),
      initWorkspace: () =>
        useBaseLearningStore.getState().initWorkspace(workspaceId),
      clearWorkspace: () =>
        useBaseLearningStore.getState().clearWorkspace(workspaceId),
    }),
    [workspaceId],
  );

  return useMemo(
    () => ({
      ...workspaceData,
      ...actions,
    }),
    [workspaceData, actions],
  );
};
