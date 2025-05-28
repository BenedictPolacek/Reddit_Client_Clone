'use client'
import { useEffect, useState } from "react";

export function useWindowWidth(width: number = 4000){
  const [isWindowWide, setIsWindowWide] = useState<number>(width);
  useEffect(() => {
    const handleResize = () => {
      setIsWindowWide(window.innerWidth);
    };
  
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('onload', handleResize);
      window.addEventListener('resize', handleResize);
    }
  
    return () => {
      if (typeof window !== 'undefined') {      
        window.removeEventListener('onload', handleResize);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  return isWindowWide;
}
