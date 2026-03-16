import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import type {
  ArticleDocument,
  ArticleSectionData,
  TocItem,
} from "@/lib/article-types";

const ARTICLE_PATH = path.join(process.cwd(), "content", "report.md");

function slugify(input: string): string {
  const base = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return base || "section";
}

function createUniqueSlugger() {
  const seen = new Map<string, number>();

  return (value: string) => {
    const base = slugify(value);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);

    return count === 1 ? base : `${base}-${count}`;
  };
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isAlignmentRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseMarkdown(markdown: string): ArticleDocument {
  const lines = markdown.split(/\r?\n/);
  const makeId = createUniqueSlugger();

  let title = "Báo cáo thần học";
  const toc: TocItem[] = [];
  const sections: ArticleSectionData[] = [];

  let currentSection: ArticleSectionData | null = null;
  let paragraphBuffer: string[] = [];

  const ensureSection = () => {
    if (currentSection) {
      return currentSection;
    }

    currentSection = {
      id: makeId("noi-dung"),
      title: "Nội dung",
      level: 2,
      blocks: [],
    };
    sections.push(currentSection);
    return currentSection;
  };

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    const text = paragraphBuffer.join(" ").trim();
    if (text.length > 0) {
      ensureSection().blocks.push({ type: "paragraph", text });
    }

    paragraphBuffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i] ?? "";
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      title = trimmed.slice(2).trim();
      continue;
    }

    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      flushParagraph();

      const level: 2 | 3 = trimmed.startsWith("### ") ? 3 : 2;
      const headingText = trimmed.replace(/^###?\s+/, "").trim();
      const id = makeId(headingText);

      currentSection = {
        id,
        title: headingText,
        level,
        blocks: [],
      };
      sections.push(currentSection);
      toc.push({ id, level, title: headingText });
      continue;
    }

    if (trimmed.startsWith("|")) {
      flushParagraph();

      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      i -= 1;

      const parsedRows = tableLines
        .map(parseTableRow)
        .filter((row) => row.length > 0)
        .filter((row) => !isAlignmentRow(row));

      if (parsedRows.length >= 2) {
        const [headers, ...rows] = parsedRows;
        ensureSection().blocks.push({
          type: "table",
          headers,
          rows,
        });
      }
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();

      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      i -= 1;

      const quoteText = quoteLines.join(" ").trim();
      if (quoteText) {
        ensureSection().blocks.push({ type: "blockquote", text: quoteText });
      }
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();

  return {
    title,
    toc,
    sections,
  };
}

export const getArticleDocument = cache(async (): Promise<ArticleDocument> => {
  const markdown = await fs.readFile(ARTICLE_PATH, "utf8");
  return parseMarkdown(markdown);
});

export { parseMarkdown };
