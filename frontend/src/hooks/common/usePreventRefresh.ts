import { useEffect, useRef } from 'react';

interface UsePreventRefreshOptions {
  message?: string;
  enabled?: boolean;
}

export const usePreventRefresh = (options: UsePreventRefreshOptions = {}) => {
  const {
    message = '페이지를 새로고침하면 작성 중인 내용이 사라질 수 있습니다. 정말 새로고침하시겠습니까?',
    enabled = true,
  } = options;

  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!enabledRef.current) return;

      e.preventDefault();
      e.returnValue = message;

      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message]);

  return {
    enable: () => {
      enabledRef.current = true;
    },
    disable: () => {
      enabledRef.current = false;
    },
    toggle: () => {
      enabledRef.current = !enabledRef.current;
    },
    isEnabled: () => enabledRef.current,
  };
};
