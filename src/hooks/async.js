import React from "react";

export function useAsync() {
  const [state, dispatch] = React.useReducer(
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

  const run = React.useCallback((promise) => {
    dispatch({ type: "loading" });
    promise.then(
      (result) => {
        dispatch({ type: "success", payload: result });
      },
      (error) => {
        dispatch({ type: "error", payload: error.message });
      }
    );
  }, []);

  return { state, run };
}
