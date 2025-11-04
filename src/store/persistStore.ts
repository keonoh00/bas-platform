// store/persistStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PersistState {
  persistBoolean: boolean;
}

export interface PersistActions {
  toggle: () => void;
}

export type PersistStore = PersistState & PersistActions;

export const usePersistStore = create<PersistStore>()(
  persist(
    (set) => ({
      persistBoolean: false,
      toggle: () =>
        set((state) => ({
          persistBoolean: !state.persistBoolean,
        })),
    }),
    {
      name: "persist-store",
      // Optional: add version, migrate, etc.
    }
  )
);
