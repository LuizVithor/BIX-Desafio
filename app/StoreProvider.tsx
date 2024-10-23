"use client";
import { store } from "@/lib/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { setupListeners } from "@reduxjs/toolkit/query";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {

  useEffect(() => {
    if (store != null) {
      const unsubscribe = setupListeners(store.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
