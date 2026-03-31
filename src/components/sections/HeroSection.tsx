"use client";

import Container from "../layout/Container";
import Button from "../ui/Button";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { Sprout } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-seed-green-50 via-white to-white pt-16">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-seed-green-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-seed-warm-50 rounded-full blur-3xl opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-seed-green-100 mb-8">
              <Sprout className="w-8 h-8 text-seed-green-600" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <p className="text-lg sm:text-xl text-seed-earth-700 mb-4">
              당신이라는 씨앗이 제대로 싹틔울 수 있도록
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-seed-earth-900">
              SEED
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.3}>
            <p className="mt-6 text-base sm:text-lg text-seed-earth-700 leading-relaxed max-w-xl">
              &ldquo;나는 어떤 사람일까?&rdquo;라는 질문이 막막하게 느껴질 때,
              SEED는 당신이 가진 작은 조각들을 모아 당신만의 선명한 지도를
              그려내는 곳입니다.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.4}>
            <p className="mt-4 text-base text-seed-earth-700">
              막연했던 당신의 잠재력을 구체적인 가능성으로 바꾸는 탐색의 시간을
              제안합니다.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.5}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg">프로그램 살펴보기</Button>
              <Button variant="outline" size="lg">
                자세히 알아보기
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
