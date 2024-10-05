import type { LimitCheckResult, LimitChecker } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { checkLimits } from "./functions";

/**
 * 2分間に5回でのチェックイン規制を確認するクラス
 */
export class Check2min implements LimitChecker {
  /**
   * チェックイン規制の名称
   */
  readonly TITLE = "2分間に5回のチェックイン";

  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 5;

  constructor(
    private checkins: CheckinItem[],
    private now: Date,
  ) {}

  /**
   * 2分間に5回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const newCheckerResult = checkLimits(
      this.checkins,
      this.now,
      this.CHECKIN_LIMIT,
      2,
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
