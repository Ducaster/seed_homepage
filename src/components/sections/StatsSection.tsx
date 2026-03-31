"use client";

import Container from "../layout/Container";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-seed-green-600">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {STATS.map((stat, index) => (
            <AnimateOnScroll key={stat.label} delay={index * 0.1}>
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-seed-green-100 text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
