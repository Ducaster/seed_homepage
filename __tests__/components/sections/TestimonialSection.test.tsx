import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TestimonialSection from "@/components/sections/TestimonialSection";

describe("TestimonialSection", () => {
  it("후기 카드 본문에 한국어 줄바꿈 스타일을 적용한다", () => {
    render(<TestimonialSection />);

    expect(
      screen.getByText(
        "나중에 후회하지 않기 위해 나에 대해 알아보려고 SEED의 프로그램을 선택했어요.",
      ),
    ).toHaveClass("break-keep");
  });
});
