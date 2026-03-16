import type { JSX } from "react";

import { Blockquote } from "@/components/Blockquote";
import { ParagraphWithCitations } from "@/components/ParagraphWithCitations";
import type { ArticleSectionData, Citation } from "@/lib/article-types";

type ArticleSectionProps = {
  section: ArticleSectionData;
  citationsById: Record<number, Citation>;
};

const headingClassByLevel: Record<2 | 3, string> = {
  2: "mt-24 scroll-mt-24 border-b border-[var(--color-gold-soft)]/40 pb-4 font-heading text-4xl leading-tight text-[var(--color-midnight)] md:text-5xl",
  3: "mt-16 scroll-mt-24 font-heading text-[1.85rem] leading-tight text-[var(--color-burgundy)] md:text-[2.25rem]",
};

function renderHeading(level: 2 | 3, id: string, title: string): JSX.Element {
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag id={id} className={`group relative ${headingClassByLevel[level]}`}>
      <a
        href={`#${id}`}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 hidden md:block"
        aria-label={`Liên kết đến phần ${title}`}
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
          className="text-[var(--color-gold)]"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </a>
      {title}
    </Tag>
  );
}

export function ArticleSection({ section, citationsById }: ArticleSectionProps) {
  return (
    <section aria-labelledby={section.id}>
      {renderHeading(section.level, section.id, section.title)}

      <div className="mt-6 space-y-6 text-[1.1rem] leading-[1.95] tracking-[0.005em] text-[var(--color-ink)] md:text-[1.16rem]">
        {section.blocks.map((block, index) => {
          if (block.type === "paragraph") {
            const isOpeningParagraph = index === 0 && section.level === 2;
            return (
              <ParagraphWithCitations
                key={`${section.id}-paragraph-${index}`}
                text={block.text}
                citationsById={citationsById}
                className={
                  isOpeningParagraph
                    ? "text-balance first-letter:mr-3 first-letter:float-left first-letter:font-heading first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-[var(--color-midnight)] md:first-letter:text-7xl"
                    : "text-balance"
                }
              />
            );
          }

          if (block.type === "blockquote") {
            return (
              <Blockquote key={`${section.id}-quote-${index}`}>
                <ParagraphWithCitations
                  text={block.text}
                  citationsById={citationsById}
                  className="italic"
                />
              </Blockquote>
            );
          }

          if (block.type === "table") {
            return (
              <div
                key={`${section.id}-table-${index}`}
                className="my-12 overflow-x-auto rounded-lg border border-[var(--color-gold-soft)]/30 bg-[var(--color-paper)] shadow-sm"
              >
                <table className="font-ui min-w-full border-collapse text-left text-[0.95rem] leading-relaxed">
                  <thead className="bg-[var(--color-midnight)] text-[var(--color-paper)]">
                    <tr>
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={`${section.id}-table-header-${headerIndex}`}
                          className="px-6 py-4 font-heading text-lg font-medium tracking-wide"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-gold-soft)]/20">
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={`${section.id}-table-row-${rowIndex}`}
                        className="transition-colors hover:bg-[var(--color-gold-soft)]/5"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${section.id}-table-row-${rowIndex}-cell-${cellIndex}`}
                            className="px-6 py-4 align-top text-[var(--color-ink)]"
                          >
                            <ParagraphWithCitations
                              text={cell}
                              citationsById={citationsById}
                              className="leading-relaxed"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
