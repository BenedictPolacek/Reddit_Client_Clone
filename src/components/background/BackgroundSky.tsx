'use client'
import './backgroundStyle.css';
import { useWindowWidth } from '@/hooks/useWindowWidth';

export default function Background() {
  const backgroundWidth = 1878;
  const windowWidth = useWindowWidth(backgroundWidth * 2)
  const bgDifference = Math.ceil( windowWidth / backgroundWidth);
  const bgArray = Array.from({ length: bgDifference }, (_, i) => {
    return (
      <div id="background" key={`bg-${i}`} style={{ left: `${i * 1878}px`, top: 0 }}>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
      </div>
    );
  });

  return <>{bgArray}</>;
}