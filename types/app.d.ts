import {CheckinItem} from "./foursquare";

/**
 * 規制の確認結果のオブジェクト
 */
export interface LimitCheckResult {
  checkins: CheckinItem[]
  checkinsCount: number
  isLimited: boolean
}
