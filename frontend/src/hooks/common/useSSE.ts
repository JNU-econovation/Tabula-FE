import { useEffect, useRef, useState } from 'react';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { AuthStore } from '@/stores/authStore';

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
 * @param {string} config.url - SSE 서버 URL
 * @param {function} [config.onSuccess] - 성공 콜백 함수
 * @param {function} [config.onError] - 에러 콜백 함수
 * @param {function} [config.onComplete] - 완료 콜백 함수
 * @param {function} [config.onProgress] - 진행 상태 콜백 함수
 *
 * @description
 * SSE 연결 커스텀 훅.
 * addEventListener를 사용하여 SSE 이벤트를 처리합니다.
 * polyfill 을 사용하여 headers 지원
 *
 */
export const useSSE = <T = any, P = any>(config: SSEConfig<T, P>) => {
  const EventSource = EventSourcePolyfill || NativeEventSource;
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
    const token = AuthStore.getState().accessToken;
    if (eventSourceRef.current) return;

    const eventSource = new EventSource(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    eventSourceRef.current = eventSource;

    setState((prev) => ({
      ...prev,
      isConnected: true,
      isError: false,
      error: null,
    }));

    eventSource.addEventListener('progress', (e: any) => {
      try {
        const parsedData = JSON.parse(e.data);

        if (parsedData.success) {
          const response = parsedData.response;
          const progress = response.progress;

          onProgress?.(response);
        } else if (parsedData.error) {
          alert(parsedData.error);
          setState((prev) => ({
            ...prev,
            error: parsedData.error,
            isError: true,
          }));
          onError?.(parsedData.error);
          onComplete?.();
          disconnect();
        }
      } catch (error) {
        alert('Error: SSE data 파싱 에러 (progress)');
        setState((prev) => ({
          ...prev,
          error: error,
          isError: true,
          isSuccess: false,
        }));
        alert(error);
        onError?.(error);
        onComplete?.();
        disconnect();
      }
    });

    eventSource.addEventListener('complete', (e: any) => {
      try {
        const parsedData = JSON.parse(e.data);

        if (parsedData.success) {
          const response = parsedData.response;
          setState((prev) => ({
            ...prev,
            data: response,
            isSuccess: true,
          }));
          onSuccess?.(response);
        } else if (parsedData.error) {
          setState((prev) => ({
            ...prev,
            error: parsedData.error,
            isError: true,
          }));
          onError?.(parsedData.error);
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error,
          isError: true,
          isSuccess: false,
        }));
        onError?.(error);
      } finally {
        onComplete?.();
        disconnect();
      }
    });

    eventSource.addEventListener('error', (e: any) => {
      try {
        const parsedData = JSON.parse(e.data);
        console.error('🔍 Parsed SSE error data:', parsedData);

        setState((prev) => ({
          ...prev,
          error: parsedData.error,
          isError: true,
        }));
        onError?.(parsedData.error);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error,
          isError: true,
          isSuccess: false,
        }));
        onError?.(error);
      } finally {
        onComplete?.(); // 완료 콜백 호출
        disconnect(); // 연결 해제
      }
    });

    eventSource.onerror = (error) => {
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
