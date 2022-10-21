import {CheckinItem} from "../types/foursquare";
import {LimitCheckResult} from "../types/app";

export class LimitChecker {
  constructor(private checkins: CheckinItem[]) {
  }

  check (): LimitCheckResult[] {
    return [

    ]
  }
}
