import type { LimitChecker, LimitCheckResult } from "../types/app";
import type { CheckinItem } from "../types/foursquare";
import dayjs from "dayjs";
import { createdAt2DayJs } from "./functions";

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
    const day1ago = dayjs(this.now).add(-1, "days");
    const matchCheckins: CheckinItem[] = this.checkins.filter((checkin) =>
      dayjs(checkin.createdAt * 1000).isAfter(day1ago),
    );
    const thresholdCheckin = matchCheckins[this.CHECKIN_LIMIT - 1];

    return {
      title: this.TITLE,
      limit: this.CHECKIN_LIMIT,
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      period: {
        from: day1ago.toDate(),
        to: this.now,
        value: 1,
        unit: "days",
      },
      isLimited: this.isLimited(matchCheckins.length),
      unlimitAt:
        thresholdCheckin == null
          ? null
          : createdAt2DayJs(thresholdCheckin.createdAt).add(1, "days").toDate(),
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
