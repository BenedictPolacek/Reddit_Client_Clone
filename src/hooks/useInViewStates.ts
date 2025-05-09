'use client'
import { useState } from "react";

export function useInViewState(inViewCount: number = 2) {
  const [inViews, setInViews] = useState<boolean[]>(() => Array(inViewCount).fill(false));

  const inViewHandler = (index: number) => (inView: boolean) => {
    setInViews((prev) => {
      if (prev[index] === inView) return prev;
      const copy = [...prev];
      copy[index] = inView;
      return copy;
    });
  }
  return {inViews, inViewHandler, inViewCount}
}