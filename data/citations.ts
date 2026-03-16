import type { Citation } from "@/lib/article-types";

export const citations: Citation[] = [
  {
    id: 1,
    sourceTitle: "Mục 3: Bảy lời cầu xin (2803-2854) - Augustinô",
    url: "https://augustino.net/giao-ly-so-2803-2854",
    accessedAt: "2026-03-16",
  },
  {
    id: 2,
    sourceTitle: "Xin Cứu Chúng Con Cho Khỏi Sự Dữ - Trang Chính",
    url: "http://khoi-nguon.com/index.php?option=com_content&view=article&id=612:xin-cuu-chung-con-cho-khoi-su-du-&catid=109:tai-lieu-khac&Itemid=547",
    accessedAt: "2026-03-16",
  },
  {
    id: 3,
    sourceTitle: "Tại Sao Đức Giáo Hoàng Phanxicô Không Ngừng Nói Về Ma Quỷ - YouTube",
    url: "https://www.youtube.com/watch?v=buqbnStsmd0",
    accessedAt: "2026-03-16",
  },
  {
    id: 4,
    sourceTitle: "Phải chăng Đức Thánh Cha Phanxicô đã từng trừ tà? - VietCatholic News",
    url: "http://www.vietcatholic.net/News/html/282311.htm",
    accessedAt: "2026-03-16",
  },
  {
    id: 5,
    sourceTitle: "ĐỨC PHANXICÔ NHẮC NHỚ RẰNG MA QUỶ KHÔNG THỂ LÀM GÌ - Xuân Bích Vietnam",
    url: "https://xuanbichvietnam.net/trangchu/duc-phanxico-nhac-nho-rang-ma-quy-khong-the-lam-gi-duoc-neu-co-su-cau-nguyen/",
    accessedAt: "2026-03-16",
  },
  {
    id: 6,
    sourceTitle: "ĐỨC THÁNH CHA: MA QUỶ KHÔNG THỂ LÀM GÌ NẾU CÓ SỰ CẦU NGUYỆN - HĐGMVN",
    url: "https://hdgmvietnam.com/chi-tiet/duc-thanh-cha-ma-quy-khong-the-lam-gi-neu-co-su-cau-nguyen-50637",
    accessedAt: "2026-03-16",
  },
  {
    id: 7,
    sourceTitle: "19 lời khuyên giúp bạn chiến đấu chống lại ma quỷ - Dòng Tên",
    url: "https://dongten.net/19-loi-khuyen-giup-ban-chien-dau-chong-lai-ma-quy/",
    accessedAt: "2026-03-16",
  },
  {
    id: 8,
    sourceTitle: "Những hành động khác thường của ma quỷ - HĐGMVN",
    url: "https://hdgmvietnam.com/chi-tiet/nhung-hanh-dong-khac-thuong-cua-ma-quy-40945",
    accessedAt: "2026-03-16",
  },
  {
    id: 9,
    sourceTitle: "Holy Water - Missionaries of the Holy Family",
    url: "https://msf-america.org/blog/424-holy-water",
    accessedAt: "2026-03-16",
  },
  {
    id: 10,
    sourceTitle: "Nghi lễ trừ tà - Wikipedia tiếng Việt",
    url: "https://vi.wikipedia.org/wiki/Nghi_l%E1%BB%85_tr%E1%BB%AB_t%C3%A0",
    accessedAt: "2026-03-16",
  },
  {
    id: 11,
    sourceTitle: "Đề mục 1. Các Á bí tích (Điều 1166-1172) - Augustinô",
    url: "https://augustino.net/giao-luat-dieu-1166-1172",
    accessedAt: "2026-03-16",
  },
  {
    id: 12,
    sourceTitle: "Thánh Antôn đã chiến đấu với ma quỷ như thế nào? - Giáo xứ Tân Việt",
    url: "http://giaoxutanviet.com/thanh-anton-da-chien-dau-voi-ma-quy-nhu-the-nao/",
    accessedAt: "2026-03-16",
  },
  {
    id: 13,
    sourceTitle: "Ma Quỷ Run Sợ Khi Đối Diện Với Đức Mẹ Maria - YouTube",
    url: "https://www.youtube.com/watch?v=4dIFZBr3qxo",
    accessedAt: "2026-03-16",
  },
  {
    id: 14,
    sourceTitle: "Mười bài học thiêng liêng từ thánh nữ Têrêsa Avila - Dòng Tên",
    url: "https://dongten.net/muoi-bai-hoc-thieng-lieng-tu-thanh-nu-teresa-avila/",
    accessedAt: "2026-03-16",
  },
  {
    id: 15,
    sourceTitle: "Holy Water (đoạn trích dẫn neo) - Missionaries of the Holy Family",
    url: "https://msf-america.org/blog/424-holy-water#:~:text=I%20often%20recall%20a%20similar,from%20coming%20back%20again...",
    accessedAt: "2026-03-16",
  },
  {
    id: 16,
    sourceTitle: "Reflections of Saint Teresa on the Value of Holy Water - The Catholic Reader",
    url: "http://thecatholicreader.blogspot.com/2013/01/the-value-of-holy-water.html",
    accessedAt: "2026-03-16",
  },
  {
    id: 17,
    sourceTitle: "Saint Teresa of Avila's Demonic Experience that Proved the Power of Holy Water",
    url: "https://www.churchpop.com/st-teresa-of-avilas-demonic-experience-that-proved-the-power-of-holy-water/",
    accessedAt: "2026-03-16",
  },
];

export const citationsById = Object.fromEntries(
  citations.map((citation) => [citation.id, citation]),
) as Record<number, Citation>;
