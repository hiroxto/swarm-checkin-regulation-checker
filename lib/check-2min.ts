import {LimitChecker, LimitCheckResult} from "../types/app";
import {CheckinItem} from "../types/foursquare";
import dayjs from "dayjs";

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

  constructor(private checkins: CheckinItem[], private now: Date) {
  }

  /**
   * 2分間に5回のチェックインが行われているかをチェックする
   */
  check(): LimitCheckResult {
    const min2ago = dayjs(this.now).add(-2, "minute");
    const matchCheckins: CheckinItem[] = this.checkins.filter(checkin => dayjs(checkin.createdAt * 1000).isAfter(min2ago));

    return {
      title: this.TITLE,
      checkins: matchCheckins,
      checkinsCount: matchCheckins.length,
      period: {
        from: min2ago.toDate(),
        to: this.now,
      },
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
