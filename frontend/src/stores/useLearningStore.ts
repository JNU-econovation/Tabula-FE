// stores/learningStore.ts
import { ResultItem } from '@/api/workspace';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LearningState {
  learningResult: ResultItem[];
  isLoading: boolean;
  setLearningResult: (newList: ResultItem[]) => void;
  addLoadingResult: (taskId: string, fileName: string) => void;
  resetResults: () => void;
  completeLoadingResult: (completedResult: ResultItem) => void;
}

export const useLearningStore = create<LearningState>()(
  devtools((set) => ({
    learningResult: [],
    isLoading: false,

    setLearningResult: (newList) => set({ learningResult: newList }),

    addLoadingResult: (taskId, fileName) => {
      set((state) => ({
        learningResult: [
          ...state.learningResult,
          {
            resultId: taskId,
            resultFileName: fileName,
            resultImages: [],
            resultStatus: 'LOADING',
          },
        ],
        isLoading: true,
      }));
    },

    completeLoadingResult: (completedResult) => {
      set((state: LearningState) => {
        const updatedResults: ResultItem[] = state.learningResult.map((item: ResultItem) =>
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
          learningResult: updatedResults,
          isLoading: hasLoadingItems,
        };
      });
    },
  })),
);
