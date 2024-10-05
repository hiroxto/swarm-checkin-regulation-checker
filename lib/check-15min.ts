import type { LimitCheckResult, LimitChecker } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { checkLimits } from "./functions";

/**
 * 15分間に8回でのチェックイン規制を確認するクラス
 */
export class Check15min implements LimitChecker {
  /**
   * チェックイン規制の名称
   */
  readonly TITLE = "15分間に8回のチェックイン";

  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 8;

  constructor(
    private checkins: CheckinItem[],
    private now: Date,
  ) {}

  /**
   * 15分間に8回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const newCheckerResult = checkLimits(
      this.checkins,
      this.now,
      this.CHECKIN_LIMIT,
      15,
      "minutes",
    );

    return {
      ...newCheckerResult,
      title: this.TITLE,
      checkinsCount: newCheckerResult.checkins.length,
      unlimitAt: newCheckerResult.unLimitingAt,
    };
  }
}
