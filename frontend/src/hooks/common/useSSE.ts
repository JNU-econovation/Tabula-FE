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
  const EventSourceImpl = EventSourcePolyfill || NativeEventSource;
  const { url, onSuccess, onError, onComplete, onProgress } = config;

  const [state, setState] = useState<SSEState<T>>({
    isConnected: false,
    data: null,
    error: null,
    isSuccess: false,
    isError: false,
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  // -----------------------
  // Disconnect (취소 가능)
  // -----------------------
  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;

      setState((prev) => ({
        ...prev,
        isConnected: false,
      }));
    }
  };

  // -----------------------
  // Connect SSE
  // -----------------------
  const connect = () => {
    const token = AuthStore.getState().accessToken;
    if (eventSourceRef.current) return;

    const eventSource = new EventSourceImpl(url, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
      heartbeatTimeout: 60000,
    });

    eventSourceRef.current = eventSource;

    setState((prev) => ({
      ...prev,
      isConnected: true,
      isError: false,
      error: null,
    }));

    // -----------------------
    // Ping Event
    // -----------------------
    eventSource.addEventListener('ping', (e: any) => {
      try {
        const data = JSON.parse(e.data);
        console.log('Keep-alive received:', data);
      } catch (err) {
        console.error('Failed to parse ping:', err);
      }
    });

    // -----------------------
    // Progress Event
    // -----------------------
    eventSource.addEventListener('progress', (e: any) => {
      try {
        const parsed = JSON.parse(e.data);
        if (parsed.success) {
          onProgress?.(parsed.response);
        } else if (parsed.error) {
          setState((prev) => ({ ...prev, error: parsed.error, isError: true }));
          onError?.(parsed.error);
          onComplete?.();
          disconnect();
        }
      } catch (err) {
        setState((prev) => ({ ...prev, error: err, isError: true }));
        onError?.(err);
        onComplete?.();
        disconnect();
      }
    });

    // -----------------------
    // Complete Event
    // -----------------------
    eventSource.addEventListener('complete', (e: any) => {
      try {
        const parsed = JSON.parse(e.data);
        if (parsed.success) {
          setState((prev) => ({
            ...prev,
            data: parsed.response,
            isSuccess: true,
          }));
          onSuccess?.(parsed.response);
        } else if (parsed.error) {
          setState((prev) => ({ ...prev, error: parsed.error, isError: true }));
          onError?.(parsed.error);
        }
      } catch (err) {
        setState((prev) => ({ ...prev, error: err, isError: true }));
        onError?.(err);
      } finally {
        onComplete?.();
        disconnect();
      }
    });

    // -----------------------
    // Server Error Event
    // -----------------------
    eventSource.addEventListener('error', (e: any) => {
      try {
        const parsed = JSON.parse(e.data);
        if (parsed.success === false && parsed.error) {
          setState((prev) => ({ ...prev, error: parsed.error, isError: true }));
          onError?.(parsed.error);
        } else {
          setState((prev) => ({
            ...prev,
            error: 'Server sent unexpected error',
            isError: true,
          }));
          onError?.('Server sent unexpected error');
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: `Malformed error: ${e.data}`,
          isError: true,
        }));
        onError?.(`Malformed error: ${e.data}`);
      } finally {
        onComplete?.();
        disconnect();
      }
    });

    // -----------------------
    // Connection Error (Network)
    // -----------------------
    eventSource.onerror = (errEvent: any) => {
      setState((prev) => ({ ...prev, isConnected: false }));
      disconnect();
    };
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    connect();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      disconnect();
    };
  }, [url]);

  return {
    ...state,
    disconnect: () => disconnect(),
    reconnect: () => {
      disconnect();
      setTimeout(connect, 100);
    },
  };
};
