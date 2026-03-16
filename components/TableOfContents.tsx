"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "@/lib/article-types";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const onScroll = () => {
      const marker = window.scrollY + 180;
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) {
          continue;
        }

        if (element.offsetTop <= marker) {
          current = item.id;
        }
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] overflow-auto border-l border-[var(--color-gold-soft)]/30 pl-6 lg:block lg:w-[17rem]">
        <div className="mb-8">
          <h2 className="font-heading text-2xl text-[var(--color-midnight)]">
            Mục lục
          </h2>
          <div className="mt-2 h-0.5 w-12 bg-[var(--color-gold)]" />
        </div>
        <nav aria-label="Mục lục bài viết">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`font-ui relative block py-2 text-[0.85rem] leading-snug transition-all duration-300 ${
                      item.level === 3 ? "pl-5 opacity-80" : "font-medium"
                    } ${
                      isActive
                        ? "text-[var(--color-burgundy)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-midnight)]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -left-[1.55rem] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-burgundy)]" />
                    )}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <button
        type="button"
        className="font-ui fixed right-6 bottom-10 z-[1000] flex items-center gap-2 rounded-full bg-[#1b2848] px-6 py-4 text-[0.8rem] font-bold uppercase tracking-widest text-white shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] transition-all hover:scale-105 active:scale-95 lg:hidden"
        onClick={() => setOpenMobile(true)}
        aria-label="Mở mục lục"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        Mục lục
      </button>

      {openMobile ? (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpenMobile(false);
            }
          }}
        >
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-auto border-l border-[var(--color-gold-soft)]/30 bg-[var(--color-parchment)] p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl text-[var(--color-midnight)]">Mục lục</h2>
                <div className="mt-2 h-0.5 w-10 bg-[var(--color-gold)]" />
              </div>
              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="font-ui rounded-full bg-[var(--color-midnight)]/5 p-2 text-[var(--color-muted)] hover:bg-[var(--color-midnight)]/10"
                aria-label="Đóng mục lục"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-10" aria-label="Mục lục mobile">
              <ul className="space-y-1">
                {items.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <li key={`mobile-${item.id}`}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpenMobile(false)}
                        className={`font-ui relative block py-3 text-[0.95rem] transition-all ${
                          item.level === 3 ? "pl-5 opacity-80" : "font-medium"
                        } ${
                          isActive
                            ? "text-[var(--color-burgundy)]"
                            : "text-[var(--color-ink)]"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute -left-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-burgundy)]" />
                        )}
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
