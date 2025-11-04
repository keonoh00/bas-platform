"use client";

import { useEffect, useState } from "react";

type PersistableStore = {
  persist: {
    onFinishHydration: (callback: () => void) => () => void;
    hasHydrated: () => boolean;
  };
};

export function useHydration<T extends PersistableStore>(store: T): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = store.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(store.persist.hasHydrated());

    return () => unsub();
  }, [store]);

  return hydrated;
}
