import type { CheckinItem } from "./foursquare";

type PeriodUnit = "minutes" | "days";

/**
 * 規制の確認結果のオブジェクト
 */
export interface LimitCheckResult {
  title: string;
  limit: number;
  checkins: CheckinItem[];
  checkinsCount: number;
  period: {
    from: Date;
    to: Date;
    value: number;
    unit: PeriodUnit;
  };
  isLimited: boolean;
  unlimitAt: Date | null;
}

/**
 * トータルの規制の確認結果のオブジェクト
 */
export interface AllLimitCheckResult {
  results: LimitCheckResult[];
  isLimited: boolean;
}

/**
 * 規制状況を判定するクラス
 */
export interface LimitChecker {
  check(): LimitCheckResult;
}

export interface NewLimitCheckResult {
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

export interface NewAllLimitCheckResult {
  limits: {
    m2: NewLimitCheckResult;
    m15: NewLimitCheckResult;
    d1: NewLimitCheckResult;
    d3: NewLimitCheckResult;
    d3d1: NewLimitCheckResult;
  };
  isLimited: boolean;
}
