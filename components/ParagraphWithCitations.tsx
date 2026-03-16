"use client";

import { useMemo, useState } from "react";

import { CitationModal } from "@/components/CitationModal";
import type { Citation } from "@/lib/article-types";

type ParagraphWithCitationsProps = {
  text: string;
  citationsById: Record<number, Citation>;
  className?: string;
};

type Segment =
  | { kind: "text"; value: string }
  | { kind: "citation"; id: number };

const CITE_PATTERN = /\[\^(\d+)\]/g;

function splitByCitations(text: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;
  CITE_PATTERN.lastIndex = 0;
  let match = CITE_PATTERN.exec(text);

  while (match) {
    if (match.index > cursor) {
      segments.push({
        kind: "text",
        value: text.slice(cursor, match.index),
      });
    }

    segments.push({ kind: "citation", id: Number(match[1]) });
    cursor = match.index + match[0].length;
    match = CITE_PATTERN.exec(text);
  }

  if (cursor < text.length) {
    segments.push({ kind: "text", value: text.slice(cursor) });
  }

  return segments;
}

export function ParagraphWithCitations({
  text,
  citationsById,
  className,
}: ParagraphWithCitationsProps) {
  const segments = useMemo(() => splitByCitations(text), [text]);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);

  return (
    <>
      <p className={className}>
        {segments.map((segment, index) => {
          if (segment.kind === "text") {
            return <span key={`text-${index}`}>{segment.value}</span>;
          }

          const citation = citationsById[segment.id];
          if (!citation) {
            return <sup key={`unknown-${index}`}>[{segment.id}]</sup>;
          }

          return (
            <span key={`cite-${segment.id}-${index}`} className="group relative mt-[-1em]">
              <button
                id={`cite-${citation.id}-${index}`}
                type="button"
                onClick={() => setActiveCitation(citation)}
                className="font-ui mx-[0.08em] scroll-mt-24 align-super text-[0.72em] font-semibold text-[var(--color-burgundy)] transition hover:text-[var(--color-royal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
                aria-label={`Mở trích dẫn ${citation.id}`}
              >
                [{citation.id}]
              </button>

              <span className="font-ui pointer-events-none absolute bottom-[110%] left-1/2 z-20 hidden w-72 -translate-x-1/2 rounded-md border border-[var(--color-gold-soft)] bg-[var(--color-paper)] p-3 text-left text-xs leading-5 text-[var(--color-ink)] shadow-xl lg:block lg:opacity-0 lg:transition lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                <strong className="block font-semibold text-[var(--color-midnight)]">
                  [{citation.id}] {citation.sourceTitle}
                </strong>
                <span className="mt-1 block text-[var(--color-muted)]">
                  Hover preview. Nhấn để xem chi tiết.
                </span>
              </span>
            </span>
          );
        })}
      </p>

      <CitationModal
        citation={activeCitation}
        onClose={() => setActiveCitation(null)}
      />
    </>
  );
}
