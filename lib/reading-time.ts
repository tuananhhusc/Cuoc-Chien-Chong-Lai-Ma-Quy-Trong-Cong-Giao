export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s+/).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

export function getFullArticleText(article: any): string {
  let fullText = "";
  article.sections.forEach((section: any) => {
    fullText += section.title + " ";
    section.blocks.forEach((block: any) => {
      if (block.text) fullText += block.text + " ";
      if (block.rows) {
        block.rows.forEach((row: string[]) => {
          fullText += row.join(" ") + " ";
        });
      }
    });
  });
  return fullText;
}
