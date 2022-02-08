import { useCallback, useEffect, useState } from "react";
import { AsyncStatus } from ".";

export const useAsyncFunction = (
  asyncFunction: (params?: any) => Promise<void>,
  immediate: boolean = true
): { execute: (params?: any) => Promise<void>; status: AsyncStatus } => {
  const [status, setStatus] = useState<AsyncStatus>("IDLE");

  const execute = useCallback(
    async (params?: any) => {
      setStatus("PENDING");
      await asyncFunction(params);
      setStatus("SUCCESS");
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status };
};

interface AsyncResponse<T = any> {
  execute: (params?: any) => Promise<void>;
  status: AsyncStatus;
  result?: T;
}

export const useAsyncResponse = <T = any>(
  asyncResponse: (params?: any) => Promise<T>,
  immediate: boolean = true
): AsyncResponse<T> => {
  const [status, setStatus] = useState<AsyncStatus>("IDLE");
  const [result, setResult] = useState<T | undefined>(undefined);

  const execute = useCallback(
    async (params?: any) => {
      setStatus("PENDING");
      asyncResponse(params).then((response) => {
        setResult(response);
        setStatus("SUCCESS");
      });
    },
    [asyncResponse]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, result };
};
