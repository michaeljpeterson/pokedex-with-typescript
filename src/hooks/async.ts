import React from "react";

type AsyncState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: T | null; error: string | null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };

type Action<T> =
  | { type: "loading" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: string };

interface Reducer<T> {
  (state: AsyncState<T>, action: Action<T>): AsyncState<T>;
}

export function useAsync<T>() {
  const [state, dispatch] = React.useReducer<Reducer<T>>(
    (state, action) => {
      switch (action.type) {
        case "loading":
          return { ...state, loading: true };
        case "success":
          return { status: "success", data: action.payload, error: null };
        case "error":
          return { status: "error", data: null, error: action.payload };
        default:
          return state;
      }
    },
    {
      status: "idle",
      data: null,
      error: null,
    }
  );

  const run = React.useCallback((promise: Promise<T>) => {
    dispatch({ type: "loading" });
    promise.then(
      (result) => {
        dispatch({ type: "success", payload: result });
      },
      (error: Error) => {
        dispatch({ type: "error", payload: error.message });
      }
    );
  }, []);

  return { state, run };
}
