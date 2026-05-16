import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Client } from "@/types/client";

const mocks = vi.hoisted(() => ({
  getClients: vi.fn(),
  saveClients: vi.fn(),
  generateId: vi.fn(),
  softDeleteClient: vi.fn(),
  revalidatePath: vi.fn(),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/store", () => ({
  getClients: mocks.getClients,
  saveClients: mocks.saveClients,
  generateId: mocks.generateId,
  softDeleteClient: mocks.softDeleteClient,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.redirect,
}));

function makeForm(entries: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

function makeClient(overrides: Partial<Client> = {}): Client {
  return {
    id: "client-1",
    name: "홍길동",
    phone: "010-0000-0000",
    email: "",
    birthDate: null,
    gender: "",
    program: "SEED-코칭",
    registeredAt: "2026-05-17T00:00:00.000Z",
    notes: "",
    sessions: [],
    assessments: [],
    ...overrides,
  };
}

describe("dashboard client actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.generateId.mockReturnValue("client-1");
    mocks.getClients.mockResolvedValue([]);
    mocks.saveClients.mockResolvedValue(undefined);
  });

  it("rejects client registration when phone format is invalid", async () => {
    const { addClient } = await import("@/app/dashboard/actions");

    await expect(
      addClient(makeForm({ name: "홍길동", phone: "1234" })),
    ).rejects.toThrow(
      "NEXT_REDIRECT:/dashboard/clients/new?error=invalid-phone",
    );

    expect(mocks.getClients).not.toHaveBeenCalled();
    expect(mocks.saveClients).not.toHaveBeenCalled();
  });

  it("normalizes accepted phone numbers and saves only SEED coaching", async () => {
    const { addClient } = await import("@/app/dashboard/actions");

    await expect(
      addClient(
        makeForm({
          name: "홍길동",
          phone: "01012345678",
          program: "마음 탕후루",
        }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT:/dashboard/clients/client-1");

    expect(mocks.saveClients).toHaveBeenCalledWith([
      expect.objectContaining({
        phone: "010-1234-5678",
        program: "SEED-코칭",
      }),
    ]);
  });

  it("rejects client updates when phone format is invalid", async () => {
    mocks.getClients.mockResolvedValue([makeClient()]);
    const { updateClient } = await import("@/app/dashboard/actions");

    await expect(
      updateClient(makeForm({ id: "client-1", name: "홍길동", phone: "1234" })),
    ).rejects.toThrow(
      "NEXT_REDIRECT:/dashboard/clients/client-1?error=invalid-phone&edit=1",
    );

    expect(mocks.getClients).not.toHaveBeenCalled();
    expect(mocks.saveClients).not.toHaveBeenCalled();
  });
});
