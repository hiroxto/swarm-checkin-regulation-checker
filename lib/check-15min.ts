import type { LimitChecker, LimitCheckResult } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { createdAt2Date } from "./functions";
import { addMinutes, isAfter, subMinutes } from "date-fns";

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
    const min15ago = subMinutes(this.now, 15);
    const matchCheckins: CheckinItem[] = this.checkins.filter((checkin) =>
      isAfter(createdAt2Date(checkin.createdAt), min15ago),
    );
    const thresholdCheckin = matchCheckins[this.CHECKIN_LIMIT - 1];

    return {
      title: this.TITLE,
      limit: this.CHECKIN_LIMIT,
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      period: {
        from: min15ago,
        to: this.now,
        value: 15,
        unit: "minutes",
      },
      isLimited: this.isLimited(matchCheckins.length),
      unlimitAt:
        thresholdCheckin == null
          ? null
          : addMinutes(createdAt2Date(thresholdCheckin.createdAt), 15),
    };
  }

  /**
   * 与えたチェックイン数が規制上限に引っ掛かっているかを確認する
   *
   * @param checkinsCount
   * @private
   */
  private isLimited(checkinsCount: number): boolean {
    return checkinsCount >= this.CHECKIN_LIMIT;
  }
}
