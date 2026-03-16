"use client";

import { useEffect, useRef } from "react";

import type { Citation } from "@/lib/article-types";

type CitationModalProps = {
  citation: Citation | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function CitationModal({ citation, onClose }: CitationModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!citation || !modalRef.current) {
      return;
    }

    const previousActive = document.activeElement as HTMLElement | null;
    const root = modalRef.current;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((element) => !element.hasAttribute("disabled"));

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && first && last) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousActive?.focus();
    };
  }, [citation, onClose]);

  if (!citation) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`citation-title-${citation.id}`}
        className="w-full max-w-xl rounded-lg border border-[var(--color-gold-soft)] bg-[var(--color-paper)] p-6 shadow-2xl"
      >
        <p className="font-ui text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          Trích dẫn [{citation.id}]
        </p>
        <h3
          id={`citation-title-${citation.id}`}
          className="mt-2 font-heading text-2xl text-[var(--color-midnight)]"
        >
          {citation.sourceTitle}
        </h3>
        <p className="font-ui mt-3 text-sm text-[var(--color-muted)]">
          Truy cập ngày {citation.accessedAt}
        </p>
        {citation.note ? (
          <p className="font-ui mt-2 text-sm leading-6 text-[var(--color-ink)]">
            {citation.note}
          </p>
        ) : null}
        <a
          className="font-ui mt-5 inline-flex break-all text-sm font-semibold text-[var(--color-burgundy)] underline decoration-[var(--color-gold)] underline-offset-4"
          href={citation.url}
          target="_blank"
          rel="noreferrer"
        >
          {citation.url}
        </a>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="font-ui rounded-md bg-[var(--color-midnight)] px-4 py-2 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-royal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
