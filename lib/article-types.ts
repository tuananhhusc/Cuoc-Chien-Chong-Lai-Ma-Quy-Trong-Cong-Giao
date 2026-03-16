export type TocItem = {
  id: string;
  level: 2 | 3;
  title: string;
};

export type Citation = {
  id: number;
  sourceTitle: string;
  url: string;
  accessedAt: string;
  note?: string;
};

export type ArticleBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "blockquote";
      text: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "heading";
      level: 2 | 3;
      id: string;
      text: string;
    }
  | {
      type: "citationRef";
      citationId: number;
    };

export type ArticleSectionData = {
  id: string;
  title: string;
  level: 2 | 3;
  blocks: ArticleBlock[];
};

export type ArticleDocument = {
  title: string;
  sections: ArticleSectionData[];
  toc: TocItem[];
};
