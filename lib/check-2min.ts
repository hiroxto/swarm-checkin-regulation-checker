import {LimitCheckResult} from "../types/app";
import {CheckinItem} from "../types/foursquare";

export class Check2min {
  constructor(protected checkins: CheckinItem[]) {
  }

  check(): LimitCheckResult {
    return {checkinCount: 0, description: "", limited: false}
  }
}
