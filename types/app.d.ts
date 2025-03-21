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
  m2: LimitCheckResult;
  m15: LimitCheckResult;
  d1: LimitCheckResult;
}

export interface AllLimitCheckResult {
  limits: CheckinLimits;
  isLimited: boolean;
  unLimitingAts: Date | null;
}

export type ResultKeys = (keyof CheckinLimits)[];
