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
      heartbeatTimeout: 60000,
    });

    eventSourceRef.current = eventSource;

    setState((prev) => ({
      ...prev,
      isConnected: true,
      isError: false,
      error: null,
    }));

    // Keep-alive ping event listener
    eventSource.addEventListener('ping', (event: any) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Keep-alive received:', data);
      } catch (err) {
        console.error('Failed to parse ping event:', err);
      }
    });

    // Progress event listener
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

    // Complete event listener
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
      console.log('서버로부터 명시적인 "error" 이벤트 수신:', e);
      try {
        const parsedData = JSON.parse(e.data);
        console.log('파싱된 서버 에러 데이터:', parsedData);

        if (parsedData.success === false && parsedData.error) {
          setState((prev) => ({
            ...prev,
            error: parsedData.error, // 서버가 보낸 실제 에러 메시지
            isError: true,
          }));
          onError?.(parsedData.error);
        } else {
          // 서버가 보낸 'error' 이벤트 데이터 형식이 예상과 다른 경우
          console.warn(
            'Unexpected format for server "error" event data:',
            parsedData,
          );
          setState((prev) => ({
            ...prev,
            error: 'Server sent an unexpected error message.',
            isError: true,
          }));
          onError?.('Server sent an unexpected error message.');
        }
      } catch (error) {
        // e.data가 유효한 JSON이 아니어서 파싱 실패한 경우
        console.error(
          'Failed to parse server "error" event data:',
          e.data,
          error,
        );
        setState((prev) => ({
          ...prev,
          error: `Server sent malformed error data: ${e.data}`,
          isError: true,
        }));
        onError?.(`Server sent malformed error data: ${e.data}`);
      } finally {
        onComplete?.();
        disconnect();
      }
    });

    eventSource.onerror = (errorEvent: any) => {
      console.error('SSE connection error (onerror handler):', errorEvent);
      let errorMessage: string = 'Unknown SSE connection error.';
      if (errorEvent && errorEvent.error instanceof Error) {
        const actualError = errorEvent.error;
        errorMessage = actualError.message;
        if (errorMessage.includes('No activity within')) {
          console.warn(
            'SSE connection timed out due to no activity from server.',
          );
          errorMessage = 'Server connection timed out. Please try again.';
        }
      } else {
        errorMessage = `SSE connection error: ${errorEvent.type || 'unknown type'}`;
      }

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isError: true,
        isConnected: false,
      }));
      onError?.(errorMessage);
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
