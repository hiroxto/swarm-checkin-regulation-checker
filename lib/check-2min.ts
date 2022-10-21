import {LimitCheckResult} from "../types/app";
import {CheckinItem} from "../types/foursquare";
import dayjs from "dayjs";

/**
 * 2分間に5回でのチェックイン規制を確認するクラス
 */
export class Check2min {
  /**
   * チェックインの上限
   */
  readonly CHECKIN_LIMIT = 5;

  constructor(private checkins: CheckinItem[], private now: Date) {
  }

  /**
   * 2分間に5回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const min2ago = dayjs(this.now).add(-2, "minute");
    const matchCheckins: CheckinItem[] = [];

    this.checkins.forEach(checkin => {
      const isAfter = dayjs(checkin.createdAt * 1000).isAfter(min2ago);
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
