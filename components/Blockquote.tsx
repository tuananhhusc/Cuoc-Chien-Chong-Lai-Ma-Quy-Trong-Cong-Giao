import type { ReactNode } from "react";

type BlockquoteProps = {
  children: ReactNode;
};

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="my-10 border-l-2 border-[var(--color-gold-soft)] pl-8 italic text-[color-mix(in_oklab,var(--color-ink)_80%,transparent_20%)] md:my-12 md:pl-10">
      <div className="relative">
        <span className="pointer-events-none absolute -left-6 -top-4 select-none font-heading text-4xl text-[var(--color-gold-soft)] opacity-40">
          &ldquo;
        </span>
        {children}
      </div>
    </blockquote>
  );
}
