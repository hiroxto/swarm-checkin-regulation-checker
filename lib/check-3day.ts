import {LimitCheckResult} from "../types/app";
import {CheckinItem} from "../types/foursquare";
import dayjs from "dayjs";

/**
 * 3日(72時間)に90回でのチェックイン規制を確認するクラス
 */
export class Check3day {
  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 90;

  constructor(private checkins: CheckinItem[], private now: Date) {
  }

  /**
   * 3日(72時間)に90回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const day3ago = dayjs(this.now).add(-3, "days");
    const matchCheckins: CheckinItem[] = this.checkins.filter(checkin => dayjs(checkin.createdAt * 1000).isAfter(day3ago));

    return {
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      isLimited: this.isLimited(matchCheckins.length),
    }
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
