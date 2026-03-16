import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { parseMarkdown } from "@/lib/parse-article";

const markdown = fs.readFileSync(
  path.join(process.cwd(), "content", "report.md"),
  "utf8",
);

describe("parseMarkdown", () => {
  it("creates H2/H3 TOC entries with unique anchors", () => {
    const document = parseMarkdown(markdown);

    expect(document.toc.length).toBeGreaterThan(8);
    expect(document.toc.some((item) => item.level === 2)).toBe(true);
    expect(document.toc.some((item) => item.level === 3)).toBe(true);

    const uniqueIds = new Set(document.toc.map((item) => item.id));
    expect(uniqueIds.size).toBe(document.toc.length);
  });

  it("parses the two markdown tables from the source", () => {
    const document = parseMarkdown(markdown);
    const tableCount = document.sections
      .flatMap((section) => section.blocks)
      .filter((block) => block.type === "table").length;

    expect(tableCount).toBe(2);
  });

  it("preserves citation markers in paragraph blocks", () => {
    const document = parseMarkdown(markdown);
    const paragraphs = document.sections
      .flatMap((section) => section.blocks)
      .filter((block) => block.type === "paragraph")
      .map((block) => block.text);

    expect(paragraphs.some((text) => text.includes("[^1]"))).toBe(true);
    expect(paragraphs.some((text) => text.includes("[^10]"))).toBe(true);
  });
});
