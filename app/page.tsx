import { ArticleSection } from "@/components/ArticleSection";
import { CitationFootnotes } from "@/components/CitationFootnotes";
import { TableOfContents } from "@/components/TableOfContents";
import { citations, citationsById } from "@/data/citations";
import { getArticleDocument } from "@/lib/parse-article";
import { calculateReadingTime, getFullArticleText } from "@/lib/reading-time";

export default async function Home() {
  const article = await getArticleDocument();
  const readingTime = calculateReadingTime(getFullArticleText(article));

  return (
    <main className="w-full pb-20">
      <section className="animate-fade-in mx-auto flex max-w-[1400px] flex-col items-center px-4 pt-16 pb-12 text-center md:px-8 md:pt-24 md:pb-16 xl:px-14">
        <div className="flex flex-col items-center">
          <div className="mb-6 h-px w-24 bg-[var(--color-gold)]" />
          <div className="font-ui mb-4 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[var(--color-burgundy)] md:text-[0.8rem]">
            <span>Báo Cáo Nghiên Cứu Chuyên Sâu</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-gold-soft)]" />
            <span className="small-caps font-medium lowercase tracking-widest text-[var(--color-muted)]">
              {readingTime} phút đọc
            </span>
          </div>
          <h1 className="font-heading max-w-[28ch] text-balance text-4xl leading-[1.15] text-[var(--color-midnight)] md:text-5xl lg:text-6xl xl:text-7xl">
            Thực Tại Cuộc Chiến Tâm Linh và Phương Thức Chống Lại Thế Lực Tối Tăm Trong Truyền Thống Công Giáo
          </h1>
        </div>
        
        <div className="mt-12 max-w-[75ch]">
          <p className="font-body text-balance text-lg leading-relaxed text-[var(--color-muted)] md:text-xl md:leading-relaxed">
            Trình bày học thuật về bản thể học của ma quỷ, phân định thần loại, giáo luật
            trừ tà và các phương thế thiêng liêng trong truyền thống Công giáo.
          </p>
        </div>
        
        <div className="mt-16 w-full max-w-[1400px]">
          <div className="relative h-px w-full">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,var(--color-gold-soft)_20%,var(--color-gold-soft)_80%,transparent_100%)] opacity-40" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[var(--background)] px-4 text-[var(--color-gold)]">
              <span className="text-xl">❦</span>
            </div>
          </div>
        </div>
      </section>

      <div className="animate-fade-simple [animation-delay:200ms] grid w-full grid-cols-1 gap-10 px-4 md:px-8 xl:px-14 2xl:px-20 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-12 2xl:gap-16">
        <TableOfContents items={article.toc} />

        <article className="w-full pb-10">
          {article.sections.map((section) => (
            <ArticleSection
              key={section.id}
              section={section}
              citationsById={citationsById}
            />
          ))}

          <CitationFootnotes citations={citations} />
        </article>
      </div>
    </main>
  );
}
