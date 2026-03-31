"use client";

import { Check, X } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { PRICING_PLANS } from "@/lib/constants";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-seed-earth-50">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            title="당신에게 맞는 플랜을 선택하세요"
            subtitle="모든 플랜에서 리프레임포인트의 핵심 기능을 자유롭게 이용할 수 있습니다. 언제든지 해지 가능합니다."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <AnimateOnScroll key={plan.id} delay={index * 0.15}>
              <div
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.popular
                    ? "border-2 border-seed-green-500 shadow-xl shadow-seed-green-600/10"
                    : "border border-seed-earth-200"
                }`}
              >
                {/* 인기 배지 */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>가장 인기 있는 선택</Badge>
                  </div>
                )}

                {/* 플랜 정보 */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-seed-earth-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-seed-earth-700 mt-1">
                    {plan.tagline}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-seed-earth-900">
                        {plan.price.toLocaleString("ko-KR")}
                      </span>
                      <span className="text-seed-earth-700">
                        원/{plan.period}
                      </span>
                    </div>
                    {plan.annualTotal && (
                      <p className="text-sm text-seed-earth-700 mt-1">
                        {plan.annualTotal}{" "}
                        {plan.discount && (
                          <span className="text-seed-green-600 font-semibold">
                            ({plan.discount})
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* 기능 목록 */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-seed-green-600 shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-seed-earth-300 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-seed-earth-900"
                            : "text-seed-earth-300"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
