import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoadingTaskStore {
  tasks: Record<string, string>;
  addTask: (workspaceId: string, taskId: string) => void;
  removeTask: (workspaceId: string) => void;
  getTaskId: (workspaceId: string) => string | undefined;
  hasLoading: (workspaceId: string) => boolean;
}

export const useLoadingStore = create<LoadingTaskStore>()(
  persist(
    (set, get) => ({
      tasks: {},
      addTask: (workspaceId, taskId) => {
        set((state) => ({ tasks: { ...state.tasks, [workspaceId]: taskId } }));
      },
      removeTask: (workspaceId) =>
        set((state) => {
          const copy = { ...state.tasks };
          delete copy[workspaceId];
          return { tasks: copy };
        }),
      getTaskId: (workspaceId) => get().tasks[workspaceId],
      hasLoading: (workspaceId) => !!get().tasks[workspaceId],
    }),
    {
      name: 'learning-loading-tasks',
    },
  ),
);
