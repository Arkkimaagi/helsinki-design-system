import { useEffect, useMemo, useRef } from 'react';

const defaultOptions: Parameters<MutationObserver['observe']>[1] = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['class', 'style'],
};
function useMutationObserver(onMutation: () => void, autoDisconnect = false) {
  const observerRef = useRef<MutationObserver | null>(null);
  const observedElementRef = useRef<HTMLElement | Node | null>(null);
  const functions = useMemo(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
      observedElementRef.current = null;
    }
    const connectionDisposer = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observedElementRef.current = null;
      }
    };
    return {
      connect: (targetEl: Node | HTMLElement, options = defaultOptions) => {
        if (observerRef.current) {
          if (observedElementRef.current === targetEl) {
            return connectionDisposer;
          }
          if (autoDisconnect) {
            connectionDisposer();
          } else {
            throw new Error('useMutationObserver is already observing another element.');
          }
        }
        const observer = new MutationObserver(onMutation);
        observerRef.current = observer;
        observer.observe(targetEl, options);
        observedElementRef.current = targetEl;
        return connectionDisposer;
      },
      disconnect: () => {
        connectionDisposer();
      },
    };
  }, [onMutation, autoDisconnect]);
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      observedElementRef.current = null;
    };
  }, []);
  return functions;
}

export default useMutationObserver;
