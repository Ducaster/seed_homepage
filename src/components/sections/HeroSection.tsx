"use client";

import Container from "../layout/Container";
import Button from "../ui/Button";
import AnimateOnScroll from "../ui/AnimateOnScroll";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* 데스크톱 배경 이미지 (md 이상) */}
      <img
        src="/images/hero/hero-desktop.jpg"
        alt="SEED 꽃밭 배경"
        className="absolute inset-0 w-full h-full hidden md:block object-cover object-center"
      />

      {/* 모바일 배경 이미지 (md 미만) */}
      <img
        src="/images/hero/hero-mobile.jpg"
        alt="SEED 꽃밭 배경 모바일"
        className="absolute inset-0 w-full h-full block md:hidden object-cover object-center"
      />

      {/* 하단 그라데이션 — 꽃 SEED 영역은 가리지 않음 */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />

      {/* 텍스트 콘텐츠 — 최하단에만 배치 */}
      <Container className="relative z-10 pb-10 sm:pb-14">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <AnimateOnScroll delay={0.1}>
            <h1 className="sr-only">SEED</h1>
            <p className="text-lg sm:text-xl font-medium text-white mb-2" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)' }}>
              당신이라는 씨앗이 제대로 싹틔울 수 있도록
            </p>
          </AnimateOnScroll>

          {/* 모바일: 세 파트로 분리 */}
          <div className="block md:hidden">
            <AnimateOnScroll delay={0.2}>
              <p className="text-sm text-white/90 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}>
                &ldquo;나는 어떤 사람일까?&rdquo;라는 질문이 막막하게 느껴질 때,
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.35}>
              <p className="text-sm text-white/90 leading-relaxed mt-0.5" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}>
                SEED는 당신이 가진 작은 조각들을 모아
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.5}>
              <p className="text-sm text-white/90 leading-relaxed mt-0.5" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}>
                당신만의 선명한 지도를 그려내는 곳입니다.
              </p>
            </AnimateOnScroll>
          </div>

          {/* 데스크톱: 한 덩어리 */}
          <AnimateOnScroll delay={0.2}>
            <p className="hidden md:block text-base text-white/90 leading-relaxed max-w-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}>
              &ldquo;나는 어떤 사람일까?&rdquo;라는 질문이 막막하게 느껴질 때,
              SEED는 당신이 가진 작은 조각들을 모아 당신만의 선명한 지도를
              그려내는 곳입니다.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.3}>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg">프로그램 살펴보기</Button>
              <Button variant="outline" size="lg" className="border-white/80 text-white hover:bg-white/10">
                자세히 알아보기
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
