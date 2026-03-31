"use client";

import { BookOpen, Users, Target } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { VALUE_PROPOSITIONS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Users,
  Target,
};

export default function WhySeedSection() {
  return (
    <section id="why-seed" className="py-20 lg:py-28 bg-seed-earth-50">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            title="Why SEED?"
            subtitle="SEED는 당신의 성장을 위한 최고의 환경을 제공합니다. 체계적인 콘텐츠와 커뮤니티를 통해 변화를 경험하세요."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PROPOSITIONS.map((vp, index) => {
            const Icon = iconMap[vp.icon];
            return (
              <AnimateOnScroll key={vp.title} delay={index * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-seed-green-50 mb-6">
                    {Icon && (
                      <Icon className="w-6 h-6 text-seed-green-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-seed-earth-900 mb-3">
                    {vp.title}
                  </h3>
                  <p className="text-seed-earth-700 leading-relaxed">
                    {vp.description}
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
