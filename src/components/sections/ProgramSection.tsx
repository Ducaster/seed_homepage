"use client";

import { Dna, Heart, TrendingUp } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { PROGRAMS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dna,
  Heart,
  TrendingUp,
};

export default function ProgramSection() {
  return (
    <section id="programs" className="py-20 lg:py-28 bg-white">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            title="당신의 가능성을 발견하는 SEED 프로그램"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS.map((program, index) => {
            const Icon = iconMap[program.icon];
            return (
              <AnimateOnScroll key={program.id} delay={index * 0.15} className="h-full">
                <div className="h-full group relative bg-white rounded-2xl border border-seed-earth-200 p-8 hover:border-seed-green-500 hover:shadow-xl hover:shadow-seed-green-600/5 transition-all duration-300">
                  {/* 아이콘 */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-seed-green-50 group-hover:bg-seed-green-100 transition-colors mb-6">
                    {Icon && (
                      <Icon className="w-7 h-7 text-seed-green-600" />
                    )}
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-seed-earth-900 mb-1">
                    {program.title}
                  </h3>
                  <p className="text-sm font-medium text-seed-green-600 mb-4">
                    {program.subtitle}
                  </p>

                  {/* 설명 */}
                  <p className="text-seed-earth-700 leading-relaxed text-sm">
                    {program.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
