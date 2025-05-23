import { useEffect, useRef, useState } from 'react';

export interface SSEConfig<T = any, P = any> {
  url: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  onComplete?: () => void;
  onProgress?: (data: P) => void;
}

export interface SSEState<T = any> {
  isConnected: boolean;
  data: T | null;
  error: any;
  isSuccess: boolean;
  isError: boolean;
}

/**
 * @description
 * SSE 연결 및 데이터 수신을 위한 커스텀 훅
 * 각 상태에 따라 onError, onSuccess, onComplete, onProgress 콜백 함수를 호출합니다.
 * onComplete는 성공, 실패 여부와 관계없이 항상 호출됩니다.
 * onProgress는 데이터 수신 시마다 호출됩니다.
 *
 * @param config
 * @returns
 */

export const useSSE = <T = any, P = any>(config: SSEConfig<T, P>) => {
  const { url, onSuccess, onError, onComplete, onProgress } = config;

  const [state, setState] = useState<SSEState<T>>({
    isConnected: false,
    data: null,
    error: null,
    isSuccess: false,
    isError: false,
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setState((prev) => ({ ...prev, isConnected: false }));
    }
  };

  const connect = () => {
    if (eventSourceRef.current) return;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    setState((prev) => ({
      ...prev,
      isConnected: true,
      isError: false,
      error: null,
    }));

    eventSource.onmessage = (e) => {
      try {
        const parsedData = JSON.parse(e.data);

        if (parsedData.success) {
          setState((prev) => ({
            ...prev,
            data: parsedData.response || parsedData,
            isSuccess: true,
          }));
          onSuccess?.(parsedData.response || parsedData);
          onComplete?.();
          disconnect();
          return;
        }

        if (parsedData.error) {
          alert('Error: 서버 에러임 ' + parsedData.error);
          setState((prev) => ({
            ...prev,
            error: parsedData.error,
            isError: true,
          }));
          onError?.(parsedData.error);
          onComplete?.();
          disconnect();
          return;
        }

        onProgress?.(parsedData);
      } catch (error) {
        alert('Error: SSE data 파싱 에러');

        setState((prev) => ({
          ...prev,
          error: error,
          isError: true,
          isSuccess: false,
        }));
        return;
      }
    };

    eventSource.onerror = (error) => {
      alert('Error: SSE 연결 에러');
      setState((prev) => ({
        ...prev,
        error,
        isError: true,
        isConnected: false,
      }));
      onError?.(error);
      onComplete?.();
      disconnect();
    };
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [url]);

  return {
    ...state,
    disconnect,
    reconnect: () => {
      disconnect();
      setTimeout(connect, 100);
    },
  };
};
