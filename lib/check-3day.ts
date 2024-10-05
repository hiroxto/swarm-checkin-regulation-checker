import type { LimitCheckResult, LimitChecker } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { checkLimits } from "./functions";

/**
 * 3日(72時間)に90回でのチェックイン規制を確認するクラス
 */
export class Check3day implements LimitChecker {
  /**
   * チェックイン規制の名称
   */
  readonly TITLE = "3日(72時間)に90回のチェックイン";

  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 90;

  constructor(
    private checkins: CheckinItem[],
    private now: Date,
  ) {}

  /**
   * 3日(72時間)に90回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const newCheckerResult = checkLimits(
      this.checkins,
      this.now,
      this.CHECKIN_LIMIT,
      3,
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
