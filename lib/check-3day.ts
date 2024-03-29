import type { LimitChecker, LimitCheckResult } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import dayjs from "dayjs";
import { createdAt2DayJs } from "./functions";

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
    const day3ago = dayjs(this.now).add(-3, "days");
    const matchCheckins: CheckinItem[] = this.checkins.filter((checkin) =>
      dayjs(checkin.createdAt * 1000).isAfter(day3ago),
    );
    const thresholdCheckin = matchCheckins[this.CHECKIN_LIMIT - 1];

    return {
      title: this.TITLE,
      limit: this.CHECKIN_LIMIT,
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      period: {
        from: day3ago.toDate(),
        to: this.now,
        value: 3,
        unit: "days",
      },
      isLimited: this.isLimited(matchCheckins.length),
      unlimitAt:
        thresholdCheckin == null
          ? null
          : createdAt2DayJs(thresholdCheckin.createdAt).add(3, "days").toDate(),
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
