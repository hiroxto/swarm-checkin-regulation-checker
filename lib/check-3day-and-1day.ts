import { addDays, isAfter, subDays } from "date-fns";
import type { LimitCheckResult, LimitChecker } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import { createdAt2Date } from "./functions";

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
    const day1ago = subDays(this.now, 1);
    const matchCheckins: CheckinItem[] = this.checkins.filter((checkin) =>
      isAfter(createdAt2Date(checkin.createdAt), day1ago),
    );
    const thresholdCheckin = matchCheckins[this.CHECKIN_LIMIT - 1];

    return {
      title: this.TITLE,
      limit: this.CHECKIN_LIMIT,
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      period: {
        from: day1ago,
        to: this.now,
        value: 1,
        unit: "days",
      },
      isLimited: this.isLimited(matchCheckins.length),
      unlimitAt:
        thresholdCheckin == null
          ? null
          : addDays(createdAt2Date(thresholdCheckin.createdAt), 1),
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
