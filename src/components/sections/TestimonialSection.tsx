"use client";

import { Quote } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <Container>
        <AnimateOnScroll>
          <SectionHeading title="다른 사람들은 어땠는지 알아보세요" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.name} delay={index * 0.15} className="h-full">
              <div className="h-full relative bg-seed-earth-50 rounded-2xl p-8 flex flex-col">
                <Quote className="w-8 h-8 text-seed-green-200 mb-4" />
                <p className="text-seed-earth-700 leading-relaxed mb-6 flex-1">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  {/* 플레이스홀더 아바타 */}
                  <div className="w-10 h-10 rounded-full bg-seed-green-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-seed-green-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-seed-earth-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-seed-earth-700">
                      {testimonial.age}세
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
