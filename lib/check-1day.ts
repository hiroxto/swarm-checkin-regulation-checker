import {LimitCheckResult} from "../types/app";
import {CheckinItem} from "../types/foursquare";
import dayjs from "dayjs";

/**
 * 1日(24時間)に50回でのチェックイン規制を確認するクラス
 */
export class Check1day {
  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 50;

  constructor(private checkins: CheckinItem[], private now: Date) {
  }

  /**
   * 1日(24時間)に50回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const day1ago = dayjs(this.now).add(-1, "day");
    const matchCheckins: CheckinItem[] = [];

    this.checkins.forEach(checkin => {
      const isAfter = dayjs(checkin.createdAt * 1000).isAfter(day1ago);
      if (isAfter) {
        matchCheckins.push(checkin)
      }
    })

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
