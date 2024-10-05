import type { LimitCheckResult, LimitChecker } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { checkLimits } from "./functions";

/**
 * 1日(24時間)に30回でのチェックイン規制を確認するクラス
 */
export class Check3dayAnd1day implements LimitChecker {
  /**
   * チェックイン規制の名称
   */
  readonly TITLE = "1日(24時間)に30回のチェックイン";

  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 30;

  constructor(
    private checkins: CheckinItem[],
    private now: Date,
  ) {}

  /**
   * 1日(24時間)に30回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const newCheckerResult = checkLimits(
      this.checkins,
      this.now,
      this.CHECKIN_LIMIT,
      1,
      "days",
    );

    return {
      ...newCheckerResult,
      title: this.TITLE,
      checkinsCount: newCheckerResult.checkins.length,
      unlimitAt: newCheckerResult.unLimitingAt,
    };
  }
}
