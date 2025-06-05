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
    //TODO: 추후 headers 선택할 수 있도록 개선 필요.
    // 게스트모드와 일반모드 다르게
    eventSourceRef.current = eventSource;

    setState((prev) => ({
      ...prev,
      isConnected: true,
      isError: false,
      error: null,
    }));

    eventSource.addEventListener('progress', (e: any) => {
      console.log('📬 SSE Progress Event Received:', e.data);
      try {
        const parsedData = JSON.parse(e.data);
        console.log('🔍 Parsed SSE progress data:', parsedData);

        if (parsedData.success) {
          const response = parsedData.response;
          const progress = response.progress;

          console.log('📊 Progress value:', progress);
          console.log('📝 Status:', response.status);

          onProgress?.(response);
          // 'progress' 이벤트에서는 아직 완료되지 않았으므로 disconnect하지 않음
        } else if (parsedData.error) {
          console.error('❌ Server error (progress event):', parsedData.error);
          alert('Error: 서버 에러임 (progress) ' + parsedData.error);
          setState((prev) => ({
            ...prev,
            error: parsedData.error,
            isError: true,
          }));
          onError?.(parsedData.error);
          onComplete?.(); // 에러 시 완료 처리
          disconnect();
        }
      } catch (error) {
        console.error('💥 JSON Parse Error (progress event):', error);
        console.error('💥 Raw data:', e.data);
        alert('Error: SSE data 파싱 에러 (progress)');
        setState((prev) => ({
          ...prev,
          error: error,
          isError: true,
          isSuccess: false,
        }));
        onError?.(error);
        onComplete?.();
        disconnect();
      }
    });

    eventSource.addEventListener('complete', (e: any) => {
      console.log('🎉 SSE Complete Event Received:', e.data);
      try {
        const parsedData = JSON.parse(e.data);
        console.log('🔍 Parsed SSE complete data:', parsedData);

        if (parsedData.success) {
          const response = parsedData.response;
          setState((prev) => ({
            ...prev,
            data: response,
            isSuccess: true,
          }));
          onSuccess?.(response);
        } else if (parsedData.error) {
          console.error('❌ Server error (complete event):', parsedData.error);
          alert('Error: 서버 에러임 (complete) ' + parsedData.error);
          setState((prev) => ({
            ...prev,
            error: parsedData.error,
            isError: true,
          }));
          onError?.(parsedData.error);
        }
      } catch (error) {
        console.error('💥 JSON Parse Error (complete event):', error);
        console.error('💥 Raw data:', e.data);
        alert('Error: SSE data 파싱 에러 (complete)');
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

    eventSource.addEventListener('error', (e: any) => {
      console.error('❌ SSE Error Event Received:', e.data);
      try {
        const parsedData = JSON.parse(e.data);
        console.error('🔍 Parsed SSE error data:', parsedData);
        alert('Error: SSE 서버 에러 이벤트 ' + parsedData.error);
        setState((prev) => ({
          ...prev,
          error: parsedData.error,
          isError: true,
        }));
        onError?.(parsedData.error);
      } catch (error) {
        console.error('💥 JSON Parse Error (error event):', error);
        console.error('💥 Raw data:', e.data);
        alert('Error: SSE error data 파싱 에러');
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
      // 이 onerror는 네트워크 오류, 서버 연결 끊김 등 일반적인 연결 오류를 처리합니다.
      console.error('🔥 SSE Connection Error:', error);
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
