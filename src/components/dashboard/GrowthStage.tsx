import {
  type GrowthStage as GrowthStageType,
  GROWTH_STAGES,
  getGrowthStage,
  getGrowthStageInfo,
  getNextStageInfo,
} from "@/types/client";

function AcornIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const cap = active ? "#9C5030" : "#D8C8B8";
  const capDark = active ? "#7A3D24" : "#C9B8A8";
  const body = active ? "#C9A07A" : "#E8DDD0";
  const highlight = active ? "#D8B48A" : "#F0E8DE";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="22.5" y="8" width="3" height="6" rx="1.5" fill={capDark} />
      <path
        d="M13 24C13 20 17.5 15 24 15C30.5 15 35 20 35 24Z"
        fill={cap}
      />
      <path
        d="M16 22.5C16 22.5 19 19 24 19C29 19 32 22.5 32 22.5"
        stroke={capDark}
        strokeWidth="0.8"
        fill="none"
      />
      <ellipse cx="24" cy="31" rx="11" ry="13" fill={body} />
      <ellipse cx="21" cy="29" rx="4" ry="6" fill={highlight} opacity="0.5" />
      <path d="M19.5 42Q24 48 28.5 42" fill={body} />
    </svg>
  );
}

function SeedlingIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const stem = active ? "#547E68" : "#C9B8A8";
  const leafLight = active ? "#7BA380" : "#D8C8B8";
  const leafDark = active ? "#547E68" : "#C9B8A8";
  const ground = active ? "#C9A07A" : "#E8DDD0";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 42V20"
        stroke={stem}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 32C24 32 15 30 13 23C13 23 19 20 24 28"
        fill={leafLight}
      />
      <path
        d="M24 25C24 25 33 23 35 16C35 16 29 13 24 21"
        fill={leafDark}
      />
      <path
        d="M24 18C24 18 28 14 32 10"
        stroke={leafDark}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="32" cy="9" rx="3" ry="4" fill={leafLight} />
      <ellipse cx="24" cy="43.5" rx="9" ry="2.5" fill={ground} />
    </svg>
  );
}

function OakIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const trunk = active ? "#9C5030" : "#C9B8A8";
  const canopy1 = active ? "#547E68" : "#D8C8B8";
  const canopy2 = active ? "#7BA380" : "#E0D0C0";
  const canopy3 = active ? "#8AB890" : "#E8DDD0";
  const ground = active ? "#C9A07A" : "#E8DDD0";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M22 44V28"
        stroke={trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M26 44V30"
        stroke={trunk}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="20" r="14" fill={canopy1} />
      <circle cx="17" cy="18" r="8" fill={canopy2} />
      <circle cx="31" cy="18" r="8" fill={canopy1} />
      <circle cx="24" cy="13" r="7" fill={canopy3} />
      <ellipse cx="24" cy="45.5" rx="11" ry="2" fill={ground} />
    </svg>
  );
}

function MatureOakIcon({
  size = 48,
  active = false,
}: {
  size?: number;
  active?: boolean;
}) {
  const trunk = active ? "#7A3D24" : "#C9B8A8";
  const branch = active ? "#9C5030" : "#C9B8A8";
  const canopy1 = active ? "#3D6B4E" : "#C9B8A8";
  const canopy2 = active ? "#547E68" : "#D8C8B8";
  const canopy3 = active ? "#7BA380" : "#E0D0C0";
  const highlight = active ? "#8AB890" : "#E8DDD0";
  const ground = active ? "#C9A07A" : "#E8DDD0";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M20 44V26"
        stroke={trunk}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M28 44V28"
        stroke={trunk}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 30L13 23"
        stroke={branch}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 32L35 25"
        stroke={branch}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="17" r="16" fill={canopy1} />
      <circle cx="15" cy="15" r="10" fill={canopy2} />
      <circle cx="33" cy="15" r="10" fill={canopy2} />
      <circle cx="24" cy="9" r="9" fill={canopy3} />
      <circle cx="9" cy="19" r="6" fill={canopy2} />
      <circle cx="39" cy="19" r="6" fill={canopy2} />
      <circle cx="19" cy="11" r="4" fill={highlight} opacity="0.5" />
      <ellipse cx="24" cy="46" rx="15" ry="2" fill={ground} />
    </svg>
  );
}

const STAGE_ICONS: Record<
  GrowthStageType,
  React.FC<{ size?: number; active?: boolean }>
> = {
  acorn: AcornIcon,
  seedling: SeedlingIcon,
  oak: OakIcon,
  "mature-oak": MatureOakIcon,
};

export function GrowthStageCard({
  sessionCount,
}: {
  sessionCount: number;
}) {
  const stageInfo = getGrowthStageInfo(sessionCount);
  const nextStage = getNextStageInfo(sessionCount);
  const CurrentIcon = STAGE_ICONS[stageInfo.key];

  const currentStageIndex = GROWTH_STAGES.findIndex(
    (s) => s.key === stageInfo.key
  );
  const currentMin = GROWTH_STAGES[currentStageIndex].minSessions;
  const nextMin = nextStage ? nextStage.minSessions : currentMin;
  const progress = nextStage
    ? Math.min(
        ((sessionCount - currentMin) / (nextMin - currentMin)) * 100,
        100
      )
    : 100;

  return (
    <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-8 text-center">
      <div className="mb-4 flex justify-center">
        <div
          className="p-5 rounded-full"
          style={{ backgroundColor: `${stageInfo.color}14` }}
        >
          <CurrentIcon size={80} active />
        </div>
      </div>

      <h3
        className="font-heading text-xl font-bold mb-1"
        style={{ color: stageInfo.color }}
      >
        {stageInfo.label}
      </h3>
      <p className="text-sm text-text-muted mb-6">{stageInfo.description}</p>

      <div className="text-3xl font-bold text-text mb-1">
        {sessionCount}
        <span className="text-base font-normal text-text-muted">회</span>
      </div>
      <p className="text-xs text-text-light mb-6">코칭 완료</p>

      {/* Timeline */}
      <div className="flex items-center justify-between gap-1 mb-3">
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
                className="p-1.5 rounded-full transition-all"
                style={{
                  boxShadow: isCurrent
                    ? `0 0 0 2px white, 0 0 0 4px ${stageInfo.color}`
                    : "none",
                  backgroundColor:
                    isCurrent || isPast
                      ? `${stage.color}18`
                      : "transparent",
                }}
              >
                <Icon size={28} active={isPast || isCurrent} />
              </div>
              <span
                className={`text-[10px] leading-tight ${
                  isCurrent
                    ? "font-bold"
                    : isPast
                      ? "font-medium"
                      : ""
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
        <div className="mt-5 pt-4 border-t border-border-lighter">
          <div className="flex items-center justify-between text-xs text-text-muted mb-2">
            <span>다음 단계까지</span>
            <span className="font-medium">
              {nextStage.minSessions - sessionCount}회 남음
            </span>
          </div>
          <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
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
        <div className="mt-5 pt-4 border-t border-border-lighter">
          <p className="text-xs text-primary font-medium">
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
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${stageInfo.color}14`,
        color: stageInfo.color,
      }}
    >
      <Icon size={16} active />
      {showLabel && stageInfo.label}
    </span>
  );
}
