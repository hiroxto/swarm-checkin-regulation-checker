import {LimitCheckResult} from "../types/app";
import {CheckinItem} from "../types/foursquare";
import dayjs from "dayjs";

/**
 * 15分間に8回でのチェックイン規制を確認するクラス
 */
export class Check15min {
  /**
   * チェックインの上限
   */
  readonly LIMIT = 8;

  constructor(private checkins: CheckinItem[], private now: Date) {
  }

  /**
   * 15分間に5回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const min15ago = dayjs(this.now).add(-15, "minute");
    const matchCheckins: CheckinItem[] = [];

    this.checkins.forEach(checkin => {
      const isAfter = dayjs(checkin.createdAt).isAfter(min15ago);
      if (isAfter) {
        matchCheckins.push(checkin)
      }
    });

    return {
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      isLimited: this.isLimited(matchCheckins.length),
    };
  }

  /**
   * 与えたチェックイン数が規制上限に引っ掛かっているかを確認する
   *
   * @param checkinsCount
   * @private
   */
  private isLimited(checkinsCount: number): boolean {
    return checkinsCount >= this.LIMIT;
  }
}
