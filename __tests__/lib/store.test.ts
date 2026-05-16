import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Client } from "@/types/client";

type SheetState = Record<string, string[][]>;

const allTabs = [
  "내담자",
  "코칭기록",
  "검사결과",
  "검사응답_성격유형",
  "검사응답_애착유형",
  "검사응답_핵심감정",
  "검사응답_드로잉",
];

const clientHeader = [
  "id",
  "이름",
  "연락처",
  "이메일",
  "출생연도",
  "성별",
  "프로그램",
  "등록일",
  "메모",
  "삭제일",
];

function createState(overrides: Partial<SheetState> = {}): SheetState {
  const state: SheetState = Object.fromEntries(
    allTabs.map((title) => [title, [[]]]),
  );

  state["내담자"] = [clientHeader];
  state["코칭기록"] = [
    ["id", "clientId", "날짜", "회차", "소요시간", "코칭내용", "메모"],
  ];
  state["검사결과"] = [["id", "clientId", "검사도구", "날짜", "결과", "메모"]];

  return { ...state, ...overrides };
}

function titleFromRange(range: string) {
  return range.match(/^'([^']+)'!/)?.[1] ?? range.split("!")[0];
}

function startIndexFromRange(range: string) {
  const row = range.match(/!A(\d+)/)?.[1];
  return row ? Number(row) - 1 : 0;
}

function setupGoogleSheetsMock(
  state: SheetState,
  options: {
    failValuesGet?: boolean;
    failUpdateRange?: string;
  } = {},
) {
  const values = {
    get: vi.fn(async ({ range }: { range: string }) => {
      if (options.failValuesGet) {
        throw new Error("simulated read failure");
      }

      const title = titleFromRange(range);
      const rows = state[title] ?? [];
      return { data: { values: rows.slice(startIndexFromRange(range)) } };
    }),
    update: vi.fn(
      async ({
        range,
        requestBody,
      }: {
        range: string;
        requestBody: { values: string[][] };
      }) => {
        if (options.failUpdateRange === range) {
          throw new Error("simulated update failure");
        }

        const title = titleFromRange(range);
        const rows = state[title] ?? [[]];
        const startIndex = startIndexFromRange(range);
        const nextRows = rows.slice();

        for (const [offset, row] of requestBody.values.entries()) {
          nextRows[startIndex + offset] = row;
        }

        state[title] = nextRows;
        return { data: {} };
      },
    ),
    clear: vi.fn(async ({ range }: { range: string }) => {
      const title = titleFromRange(range);
      const rows = state[title] ?? [[]];
      state[title] = rows.slice(0, startIndexFromRange(range));
      return { data: {} };
    }),
    append: vi.fn(
      async ({
        range,
        requestBody,
      }: {
        range: string;
        requestBody: { values: string[][] };
      }) => {
        const title = titleFromRange(range);
        state[title] = [...(state[title] ?? [[]]), ...requestBody.values];
        return { data: {} };
      },
    ),
  };

  const spreadsheets = {
    get: vi.fn(async () => ({
      data: {
        sheets: Object.keys(state).map((title) => ({
          properties: { title },
        })),
      },
    })),
    batchUpdate: vi.fn(
      async ({
        requestBody,
      }: {
        requestBody: {
          requests: { addSheet?: { properties?: { title?: string } } }[];
        };
      }) => {
        for (const request of requestBody.requests) {
          const title = request.addSheet?.properties?.title;
          if (title && !state[title]) state[title] = [[]];
        }
        return { data: {} };
      },
    ),
    values,
  };

  vi.doMock("googleapis", () => ({
    google: {
      auth: { GoogleAuth: vi.fn() },
      sheets: vi.fn(() => ({ spreadsheets })),
    },
  }));

  return { spreadsheets, values };
}

async function importStore() {
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "sheet-id";
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "service@example.com";
  process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY =
    "-----BEGIN PRIVATE KEY-----\\nkey\\n-----END PRIVATE KEY-----\\n";

  return import("@/lib/store");
}

function sampleClient(overrides: Partial<Client> = {}): Client {
  return {
    id: "client-1",
    name: "홍길동",
    phone: "010-0000-0000",
    email: "",
    birthDate: null,
    gender: "",
    program: "기본 프로그램",
    registeredAt: "2026-05-16T00:00:00.000Z",
    notes: "",
    sessions: [],
    assessments: [],
    ...overrides,
  };
}

describe("Google Sheets store safety", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doUnmock("googleapis");
  });

  it("throws when reading Sheets fails instead of returning an empty client list", async () => {
    setupGoogleSheetsMock(createState(), { failValuesGet: true });
    const { getClients } = await importStore();

    await expect(getClients()).rejects.toThrow(
      "Google Sheets 데이터를 불러오지 못했습니다.",
    );
  });

  it("keeps existing rows when a replacement write fails", async () => {
    const state = createState({
      내담자: [
        clientHeader,
        [
          "client-1",
          "기존 섭외자",
          "010-1111-1111",
          "",
          "",
          "",
          "기존 프로그램",
          "2026-05-15T00:00:00.000Z",
          "",
          "",
        ],
      ],
    });
    setupGoogleSheetsMock(state, { failUpdateRange: "'내담자'!A2" });
    const { saveClients } = await importStore();

    await expect(saveClients([sampleClient()])).rejects.toThrow(
      "데이터 저장에 실패했습니다.",
    );

    expect(state["내담자"][1][1]).toBe("기존 섭외자");
  });

  it("soft deletes a client by setting deletedAt while hiding it from active reads", async () => {
    const state = createState({
      내담자: [
        clientHeader,
        [
          "client-1",
          "삭제될 섭외자",
          "010-1111-1111",
          "",
          "",
          "",
          "프로그램 A",
          "2026-05-15T00:00:00.000Z",
          "",
          "",
        ],
        [
          "client-2",
          "남을 섭외자",
          "010-2222-2222",
          "",
          "",
          "",
          "프로그램 B",
          "2026-05-16T00:00:00.000Z",
          "",
          "",
        ],
      ],
      코칭기록: [
        ["id", "clientId", "날짜", "회차", "소요시간", "코칭내용", "메모"],
        ["session-1", "client-1", "2026-05-16", "1", "50", "기록", ""],
      ],
    });
    const { values } = setupGoogleSheetsMock(state);
    const store = await importStore();

    await store.softDeleteClient("client-1");

    const deletedRow = state["내담자"].find((row) => row[0] === "client-1");
    expect(deletedRow?.[9]).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(state["코칭기록"].some((row) => row[1] === "client-1")).toBe(true);

    const activeClients = await store.getClients();
    expect(activeClients.map((client) => client.id)).toEqual(["client-2"]);
    expect(values.clear).not.toHaveBeenCalledWith(
      expect.objectContaining({ range: "'내담자'!A2:I" }),
    );
  });

  it("preserves soft-deleted rows during later active client saves", async () => {
    const state = createState({
      "내담자": [
        clientHeader,
        [
          "client-1",
          "숨겨진 섭외자",
          "010-1111-1111",
          "",
          "",
          "",
          "프로그램 A",
          "2026-05-15T00:00:00.000Z",
          "",
          "2026-05-16T00:00:00.000Z",
        ],
        [
          "client-2",
          "활성 섭외자",
          "010-2222-2222",
          "",
          "",
          "",
          "프로그램 B",
          "2026-05-16T00:00:00.000Z",
          "",
          "",
        ],
      ],
    });
    setupGoogleSheetsMock(state);
    const { saveClients } = await importStore();

    await saveClients([
      sampleClient({
        id: "client-2",
        name: "수정된 활성 섭외자",
        phone: "010-2222-2222",
      }),
    ]);

    expect(state["내담자"].some((row) => row[0] === "client-1")).toBe(true);
    expect(state["내담자"].find((row) => row[0] === "client-1")?.[9]).toBe(
      "2026-05-16T00:00:00.000Z",
    );
    expect(state["내담자"].find((row) => row[0] === "client-2")?.[1]).toBe(
      "수정된 활성 섭외자",
    );
  });
});
