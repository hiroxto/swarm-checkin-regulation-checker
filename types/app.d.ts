import type { CheckinItem } from "./foursquare";

type PeriodUnit = "minutes" | "days";

export interface LimitCheckResult {
  limit: number;
  checkins: CheckinItem[];
  period: {
    from: Date;
    to: Date;
    value: number;
    unit: PeriodUnit;
  };
  isLimited: boolean;
  unLimitingAt: Date | null;
}

export interface CheckinLimits {
  m2: NewLimitCheckResult;
  m15: NewLimitCheckResult;
  d1: NewLimitCheckResult;
  d3: NewLimitCheckResult;
  d3d1: NewLimitCheckResult;
}

export interface AllLimitCheckResult {
  limits: CheckinLimits;
  isLimited: boolean;
}
