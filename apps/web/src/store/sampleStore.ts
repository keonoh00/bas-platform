import { createStore } from "zustand/vanilla";
import { create } from "zustand";

// 🔠 Enum
export enum SampleEnum {
  One = "Display 1",
  Two = "Display 2",
}

// 📦 Types
export type SampleState = {
  sample: SampleEnum;
};

export type SampleActions = {
  updateSample: (sample: SampleEnum) => void;
  updateSampleWithFilter: (sample: SampleEnum) => void;
};

export type SampleStore = SampleState & SampleActions;
export type SampleStoreApi = ReturnType<typeof createSampleStore>;

// 📦 Initial State
const defaultInitState: SampleState = {
  sample: SampleEnum.One,
};

// 🔧 Store factory (vanilla)
export const createSampleStore = (
  initState: SampleState = defaultInitState
) => {
  return createStore<SampleStore>((set) => ({
    ...initState,
    updateSample: (sample) => set(() => ({ sample })),
    updateSampleWithFilter: () =>
      set((state) => {
        if (!state.sample) return {};
        return { sample: state.sample };
      }),
  }));
};

// 🔁 Hook store (for default usage)
export const useSampleStore = create<SampleStore>((set) => ({
  ...defaultInitState,
  updateSample: (sample) => set(() => ({ sample })),
  updateSampleWithFilter: () =>
    set((state) => {
      if (!state.sample) return {};
      return { sample: state.sample };
    }),
}));
