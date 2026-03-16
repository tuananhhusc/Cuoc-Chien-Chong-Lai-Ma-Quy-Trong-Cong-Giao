import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ParagraphWithCitations } from "@/components/ParagraphWithCitations";
import type { Citation } from "@/lib/article-types";

const citation: Citation = {
  id: 1,
  sourceTitle: "Nguồn mẫu",
  url: "https://example.com",
  accessedAt: "2026-03-16",
};

describe("ParagraphWithCitations", () => {
  it("renders citation marker and opens modal on click", async () => {
    const user = userEvent.setup();

    render(
      <ParagraphWithCitations
        text="Một đoạn văn có chú thích[^1]."
        citationsById={{ 1: citation }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Mở trích dẫn 1" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nguồn mẫu" })).toBeInTheDocument();
  });

  it("closes modal with Escape key", async () => {
    const user = userEvent.setup();

    render(
      <ParagraphWithCitations
        text="Một đoạn văn có chú thích[^1]."
        citationsById={{ 1: citation }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Mở trích dẫn 1" }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
