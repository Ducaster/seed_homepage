"use client";

import { Check, X } from "lucide-react";
import Container from "../layout/Container";
import Badge from "../ui/Badge";
import SiteAction from "../ui/SiteAction";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import { PRICING_PLANS } from "@/lib/constants";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-seed-earth-50">
      <Container>
        <AnimateOnScroll>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-seed-earth-900">
              당신에게 맞는 플랜을 선택하세요
            </h2>
            <p className="mx-auto mt-4 max-w-[21rem] break-keep text-base leading-7 text-seed-earth-700 sm:max-w-2xl sm:text-lg">
              <span className="block">
                모든 플랜에서 SEED의 핵심 기능을 자유롭게 이용할 수 있습니다.
              </span>
              <span className="block">언제든지 해지 가능합니다.</span>
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <AnimateOnScroll
              key={plan.id}
              delay={index * 0.15}
              className="h-full"
            >
              <div
                className={`h-full flex flex-col relative bg-white rounded-2xl p-8 ${
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
                <ul className="space-y-3 mb-8 flex-1">
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
                <SiteAction
                  kind="plan"
                  label={plan.cta}
                  detailLabel={plan.name}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-seed-green-600 text-white shadow-lg shadow-seed-green-600/25 hover:bg-seed-green-700"
                      : "border-2 border-seed-earth-200 text-seed-earth-700 hover:border-seed-green-600 hover:text-seed-green-600"
                  }`}
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
