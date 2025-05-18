'use client'
import './backgroundStyle.css';
import { useWindowWidth } from '@/hooks/useWindowWidth';

export default function BackgroundSky() {
  const backgroundWidth = 1878;
  const windowWidth = useWindowWidth(backgroundWidth * 4)
  const bgDifference = Math.ceil( windowWidth / backgroundWidth);
  const bgArray = Array.from({ length: bgDifference }, (_, i) => {
    return (
      <div id="background" data-testid='background-sky' key={`bg-${i}`} style={{ left: `${i * 1878}px`, top: 0 }}>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
      </div>
    );
  });
  return <>{bgArray}</>;
}