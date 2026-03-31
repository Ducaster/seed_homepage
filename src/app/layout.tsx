import type { Metadata } from "next";
import { pretendard } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEED - 당신이라는 씨앗이 제대로 싹틔울 수 있도록",
  description:
    "나를 발견하는 가장 명확한 단서, SEED. 성격유형검사, 핵심 감정 검사, 인생그래프를 통해 당신만의 가능성을 발견하세요.",
  keywords: ["SEED", "자기발견", "성격유형검사", "핵심감정검사", "인생그래프", "멘토링", "개인성장"],
  openGraph: {
    title: "SEED - 당신이라는 씨앗이 제대로 싹틔울 수 있도록",
    description:
      "막연했던 당신의 잠재력을 구체적인 가능성으로 바꾸는 탐색의 시간을 제안합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
