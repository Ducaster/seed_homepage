import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PersonalityTestForm from "@/app/dashboard/clients/[id]/assessments/personality/PersonalityTestForm";

vi.mock("@/app/dashboard/clients/[id]/assessments/actions", () => ({
  submitPersonalityTest: vi.fn(),
}));

describe("PersonalityTestForm", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("다음으로 넘어갈 때 미응답 문항을 안내하고 해당 문항으로 스크롤한다", async () => {
    render(<PersonalityTestForm clientId="client-1" />);

    fireEvent.click(screen.getByRole("button", { name: /다음/ }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "1번 문항을 체크해주세요.",
    );
    await waitFor(() => {
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "center",
      });
    });
  });

  it("미응답 문항을 체크하면 안내를 숨긴다", async () => {
    render(<PersonalityTestForm clientId="client-1" />);

    fireEvent.click(screen.getByRole("button", { name: /다음/ }));
    const firstQuestion = screen.getByText("1.").closest("div[tabindex='-1']");
    expect(firstQuestion).not.toBeNull();

    fireEvent.click(within(firstQuestion as HTMLElement).getByText("보통이다"));

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
