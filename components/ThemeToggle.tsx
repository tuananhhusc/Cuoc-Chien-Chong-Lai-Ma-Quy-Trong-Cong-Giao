"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className="fixed right-6 top-6 z-[100] h-11 w-11 rounded-full border border-[var(--color-gold-soft)]/30 bg-[var(--background)]/80 backdrop-blur-md opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-6 top-6 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold-soft)]/30 bg-[var(--background)]/80 text-[var(--color-midnight)] shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all hover:scale-110 active:scale-95 print:hidden"
      aria-label={theme === "light" ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
    >
      <div className="transition-transform duration-300 ease-out">
        {theme === "light" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        )}
      </div>
    </button>
  );
}
