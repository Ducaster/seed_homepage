import {
  type GrowthStage as GrowthStageType,
  GROWTH_STAGES,
  getGrowthStage,
  getGrowthStageInfo,
  getNextStageInfo,
} from "@/types/client";

function SeedIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const shell = active ? "#9A6A3A" : "#D8C8B8";
  const shellDark = active ? "#73502B" : "#C9B8A8";
  const glow = active ? "#D6B37A" : "#EFE5DA";
  const root = active ? "#6C7B46" : "#D8C8B8";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 13C31 15.5 35 21.5 35 28.5C35 37 29.5 42 24 42C18.5 42 13 37 13 28.5C13 21.5 17 15.5 24 13Z"
        fill={shell}
      />
      <path
        d="M24 13C25.5 21 25.5 33.5 24 42"
        stroke={shellDark}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M22.5 41.5C22.5 41.5 19.5 44 16 44"
        stroke={root}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="20.5" cy="27" rx="3.5" ry="7" fill={glow} opacity="0.55" />
    </svg>
  );
}

function SproutIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const stem = active ? "#3F7F52" : "#C9B8A8";
  const leafLight = active ? "#78B36D" : "#D8C8B8";
  const leafDark = active ? "#4F9F63" : "#C9B8A8";
  const seed = active ? "#B8844B" : "#E8DDD0";
  const ground = active ? "#D3B47E" : "#E8DDD0";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="24" cy="43" rx="12" ry="2.5" fill={ground} />
      <path
        d="M18 38C18 34.5 20.5 32 24 32C27.5 32 30 34.5 30 38Z"
        fill={seed}
      />
      <path
        d="M24 39V18"
        stroke={stem}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 29C24 29 15.5 27.5 13 20C13 20 20 17.5 24 25.5"
        fill={leafLight}
      />
      <path
        d="M24 23C24 23 33 20.5 36 13C36 13 28.5 11.5 24 20"
        fill={leafDark}
      />
      <path
        d="M17 21C19.5 22.5 21.5 24 23.5 27"
        stroke="#2F6E45"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={active ? "0.55" : "0.25"}
      />
      <path
        d="M31 14.5C29 16.5 27.5 18 25 21"
        stroke="#2F6E45"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={active ? "0.55" : "0.25"}
      />
    </svg>
  );
}

function YoungZelkovaIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const trunk = active ? "#87613A" : "#C9B8A8";
  const branch = active ? "#9A6A3A" : "#C9B8A8";
  const canopy = active ? "#2F7D52" : "#D8C8B8";
  const leafLight = active ? "#84B982" : "#E8DDD0";
  const leafMid = active ? "#5EA86F" : "#E0D0C0";
  const ground = active ? "#D3B47E" : "#E8DDD0";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="24" cy="45" rx="13" ry="2.2" fill={ground} />
      <path
        d="M24 44V23"
        stroke={trunk}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M24 31L16 22"
        stroke={branch}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 29L32 20"
        stroke={branch}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 8C34 10 39 17.5 37 27C33.5 26 29.5 28 24 31C18.5 28 14.5 26 11 27C9 17.5 14 10 24 8Z"
        fill={canopy}
      />
      <path
        d="M16 15C19.5 12 25 11.5 30 14"
        stroke={leafLight}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="17" cy="24" r="5" fill={leafMid} />
      <circle cx="31" cy="23" r="5.5" fill={leafLight} />
    </svg>
  );
}

function ZelkovaIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const trunk = active ? "#72502F" : "#C9B8A8";
  const branch = active ? "#8A6139" : "#C9B8A8";
  const canopyDark = active ? "#285C45" : "#C9B8A8";
  const canopyMid = active ? "#3F7F52" : "#D8C8B8";
  const canopyLight = active ? "#7FB378" : "#E0D0C0";
  const highlight = active ? "#A7C98E" : "#E8DDD0";
  const ground = active ? "#D3B47E" : "#E8DDD0";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="24" cy="46" rx="16" ry="2" fill={ground} />
      <path d="M20 44C21 37 22 31 24 24C26 31 27 37 28 44" fill={trunk} />
      <path
        d="M24 28L14 20"
        stroke={branch}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 27L34 18"
        stroke={branch}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 25L24 10"
        stroke={branch}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 25C8.5 13.5 15.5 6 24 6C32.5 6 39.5 13.5 41 25C36 23 32 25 28 30C25.5 28 22.5 28 20 30C16 25 12 23 7 25Z"
        fill={canopyDark}
      />
      <path
        d="M12 22C14 13.5 18.5 9 24 9C29.5 9 34 13.5 36 22C31.5 20 28.5 22 24 26C19.5 22 16.5 20 12 22Z"
        fill={canopyMid}
      />
      <path
        d="M17 18C18.5 12.5 21 10 24 10C27 10 29.5 12.5 31 18C28 17 26 18.5 24 21C22 18.5 20 17 17 18Z"
        fill={canopyLight}
      />
      <path
        d="M13 17C15.5 13 19 10.5 23 10"
        stroke={highlight}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M30 13C33 15.5 35 19 36 22"
        stroke={highlight}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

const STAGE_ICONS: Record<
  GrowthStageType,
  React.FC<{ size?: number; active?: boolean }>
> = {
  seed: SeedIcon,
  sprout: SproutIcon,
  "young-zelkova": YoungZelkovaIcon,
  zelkova: ZelkovaIcon,
};

export function GrowthStageCard({ sessionCount }: { sessionCount: number }) {
  const stageInfo = getGrowthStageInfo(sessionCount);
  const nextStage = getNextStageInfo(sessionCount);
  const CurrentIcon = STAGE_ICONS[stageInfo.key];

  const currentStageIndex = GROWTH_STAGES.findIndex(
    (s) => s.key === stageInfo.key,
  );
  const currentMin = GROWTH_STAGES[currentStageIndex].minSessions;
  const nextMin = nextStage ? nextStage.minSessions : currentMin;
  const progress = nextStage
    ? Math.min(
        ((sessionCount - currentMin) / (nextMin - currentMin)) * 100,
        100,
      )
    : 100;

  return (
    <div className="rounded-[var(--radius-lg)] border border-seed-earth-200 bg-white p-8 text-center shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex justify-center">
        <div
          className="rounded-full border border-seed-earth-100 p-5"
          style={{ backgroundColor: `${stageInfo.color}14` }}
        >
          <CurrentIcon size={80} active />
        </div>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-seed-green-700">
        SEED 성장 단계
      </p>
      <h3
        className="font-heading mb-1 text-xl font-bold"
        style={{ color: stageInfo.color }}
      >
        {stageInfo.label}
      </h3>
      <p className="mb-6 text-sm text-text-muted">{stageInfo.description}</p>

      <div className="mb-1 text-3xl font-bold text-seed-earth-900">
        {sessionCount}
        <span className="text-base font-normal text-text-muted">회</span>
      </div>
      <p className="mb-6 text-xs text-text-light">코칭 완료</p>

      {/* Timeline */}
      <div className="mb-3 flex items-center justify-between gap-1">
        {GROWTH_STAGES.map((stage, i) => {
          const Icon = STAGE_ICONS[stage.key];
          const isPast = i < currentStageIndex;
          const isCurrent = i === currentStageIndex;
          return (
            <div
              key={stage.key}
              className="flex flex-col items-center gap-1.5 flex-1"
            >
              <div
                className="rounded-full border border-transparent p-1.5 transition-all"
                style={{
                  boxShadow: isCurrent
                    ? `0 0 0 2px white, 0 0 0 4px ${stageInfo.color}`
                    : "none",
                  backgroundColor:
                    isCurrent || isPast ? `${stage.color}18` : "transparent",
                }}
              >
                <Icon size={28} active={isPast || isCurrent} />
              </div>
              <span
                className={`text-[10px] leading-tight ${
                  isCurrent ? "font-bold" : isPast ? "font-medium" : ""
                }`}
                style={{
                  color:
                    isPast || isCurrent
                      ? stage.color
                      : "var(--color-text-light)",
                }}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {nextStage && (
        <div className="mt-5 border-t border-seed-earth-100 pt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
            <span>다음 단계까지</span>
            <span className="font-medium">
              {nextStage.minSessions - sessionCount}회 남음
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-seed-earth-100">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: stageInfo.color,
              }}
            />
          </div>
        </div>
      )}

      {!nextStage && (
        <div className="mt-5 border-t border-seed-earth-100 pt-4">
          <p className="text-xs font-medium text-seed-green-700">
            최고 단계에 도달했습니다
          </p>
        </div>
      )}
    </div>
  );
}

export function GrowthBadge({
  sessionCount,
  showLabel = true,
}: {
  sessionCount: number;
  showLabel?: boolean;
}) {
  const stageInfo = getGrowthStageInfo(sessionCount);
  const Icon = STAGE_ICONS[stageInfo.key];

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{
        backgroundColor: `${stageInfo.color}14`,
        borderColor: `${stageInfo.color}24`,
        color: stageInfo.color,
      }}
    >
      <Icon size={16} active />
      {showLabel && stageInfo.label}
    </span>
  );
}
