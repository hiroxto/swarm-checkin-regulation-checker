import type { LimitChecker, LimitCheckResult } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { createdAt2Date } from "./functions";
import { addMinutes, isAfter, subMinutes } from "date-fns";

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
    const min2ago = subMinutes(this.now, 2);
    const matchCheckins: CheckinItem[] = this.checkins.filter((checkin) =>
      isAfter(createdAt2Date(checkin.createdAt), min2ago),
    );
    const thresholdCheckin = matchCheckins[this.CHECKIN_LIMIT - 1];

    return {
      title: this.TITLE,
      limit: this.CHECKIN_LIMIT,
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      period: {
        from: min2ago,
        to: this.now,
        value: 2,
        unit: "minutes",
      },
      isLimited: this.isLimited(matchCheckins.length),
      unlimitAt:
        thresholdCheckin == null ? null : addMinutes(createdAt2Date(thresholdCheckin.createdAt), 2),
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
