import type { Citation } from "@/lib/article-types";

type CitationFootnotesProps = {
  citations: Citation[];
};

export function CitationFootnotes({ citations }: CitationFootnotesProps) {
  return (
    <section id="footnotes" className="mt-32 scroll-mt-28 border-t border-[var(--color-gold-soft)]/40 pt-12">
      <div className="mb-10">
        <h2 className="font-heading text-3xl text-[var(--color-midnight)]">Tài Liệu Tham Khảo</h2>
        <div className="mt-2 h-0.5 w-16 bg-[var(--color-gold)]" />
      </div>
      <ol className="mt-8 space-y-8">
        {citations.map((citation) => (
          <li
            key={`footnote-${citation.id}`}
            id={`footnote-${citation.id}`}
            className="group"
          >
            <div className="flex gap-4">
              <span className="font-heading shrink-0 text-xl font-medium text-[var(--color-gold)]">
                {citation.id}.
              </span>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-ui text-[1.05rem] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors">
                    {citation.sourceTitle}
                  </p>
                  <a
                    href={`#cite-${citation.id}-0`}
                    className="font-ui text-xs text-[var(--color-gold)] hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quay lại văn bản"
                  >
                    ↑ <span>Quay lại</span>
                  </a>
                </div>
                <div className="font-ui mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-[var(--color-muted)]">
                  <span>Truy cập: {citation.accessedAt}</span>
                  {citation.note && (
                    <>
                      <span className="opacity-40">•</span>
                      <span>{citation.note}</span>
                    </>
                  )}
                </div>
                <a
                  className="font-ui mt-2 inline-block break-all text-[0.85rem] text-[var(--color-midnight)]/70 hover:text-[var(--color-midnight)] hover:underline decoration-[var(--color-gold)] underline-offset-4"
                  href={citation.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {citation.url}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
