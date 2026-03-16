import type { Metadata } from "next";
import { Be_Vietnam_Pro, EB_Garamond, Lora } from "next/font/google";
import "./globals.css";

const headingFont = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Lora({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const uiFont = Be_Vietnam_Pro({
  variable: "--font-ui",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

import { BackToTop } from "@/components/BackToTop";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Chống Ma Quỷ Theo Công Giáo | Báo Cáo Nghiên Cứu Chuyên Sâu",
  description:
    "Báo cáo nghiên cứu thần học chuyên sâu về cuộc chiến tâm linh trong truyền thống Công giáo. Lưu trữ nội bộ về bản thể học và giáo luật trừ tà.",
  keywords: ["Công giáo", "Thần học", "Trừ tà", "Ma quỷ", "Chiến tranh tâm linh", "Giáo luật"],
  authors: [{ name: "Bao Cao Nghien Cuu Chuyen Sau" }],
  openGraph: {
    title: "Chống Ma Quỷ Theo Công Giáo",
    description: "Báo cáo nghiên cứu thần học chuyên sâu về cuộc chiến tâm linh.",
    type: "article",
    authors: ["Bao Cao Nghien Cuu Chuyen Sau"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${uiFont.variable} antialiased`}
      >
        <ReadingProgressBar />
        <ThemeToggle />
        <BackToTop />
        <div className="relative min-h-screen">
          {children}

          <footer className="mt-20 border-t border-[var(--color-gold-soft)] bg-[color-mix(in_oklab,var(--color-midnight)_94%,black_6%)] py-8 text-[var(--color-paper)] print:hidden">
            <div className="font-ui mx-auto max-w-[1400px] px-4 text-sm text-[color-mix(in_oklab,var(--color-paper)_82%,white_18%)] md:px-8">
              2026 Báo Cáo Nghiên Cứu Chuyên Sâu
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
