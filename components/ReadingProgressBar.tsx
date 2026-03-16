"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const windowScroll = window.scrollY;

      if (scrollHeight - clientHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = (windowScroll / (scrollHeight - clientHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 z-[100] h-1 w-full bg-transparent"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-[var(--color-gold)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
