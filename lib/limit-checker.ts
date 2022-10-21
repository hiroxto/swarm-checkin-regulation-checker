import {CheckinItem} from "../types/foursquare";
import {LimitCheckResult} from "../types/app";
import {Check2min} from "./check-2min";

export class LimitChecker {
  constructor(private checkins: CheckinItem[]) {
  }

  check (): LimitCheckResult[] {
    const check2min = new Check2min(this.checkins)
    console.log(check2min.check())

    return [
    ]
  }
}
