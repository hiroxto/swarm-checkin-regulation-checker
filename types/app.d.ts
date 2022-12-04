import {CheckinItem} from "./foursquare";

/**
 * 規制の確認結果のオブジェクト
 */
export interface LimitCheckResult {
  title: string
  checkins: CheckinItem[]
  checkinsCount: number
  period: {
    from: Date
    to: Date,
    value: number
    unit: 'minutes' | 'days',
  }
  isLimited: boolean
}

/**
 * トータルの規制の確認結果のオブジェクト
 */
export interface AllLimitCheckResult {
  results: LimitCheckResult[]
  isLimited: boolean
}

/**
 * 規制状況を判定するクラス
 */
export interface LimitChecker {
  check(): LimitCheckResult
}
