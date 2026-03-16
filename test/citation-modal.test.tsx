import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CitationModal } from "@/components/CitationModal";
import type { Citation } from "@/lib/article-types";

const citation: Citation = {
  id: 2,
  sourceTitle: "Nguồn kiểm thử",
  url: "https://example.org",
  accessedAt: "2026-03-16",
};

describe("CitationModal", () => {
  it("focuses into modal and closes on overlay click", () => {
    const onClose = vi.fn();
    render(<CitationModal citation={citation} onClose={onClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.activeElement?.tagName.toLowerCase()).toBe("a");

    fireEvent.click(screen.getByRole("presentation"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
