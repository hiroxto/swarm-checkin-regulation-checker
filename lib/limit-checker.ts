import {CheckinItem} from "../types/foursquare";
import {LimitCheckResult} from "../types/app";
import {Check2min} from "./check-2min";
import {Check15min} from "./check-15min";

export class LimitChecker {
  constructor(private checkins: CheckinItem[]) {
  }

  check (): LimitCheckResult[] {
    const now = new Date();
    const check2min = new Check2min(this.checkins, now)
    const check15min = new Check15min(this.checkins, now)
    console.log(check2min.check())
    console.log(check15min.check())

    return [
    ]
  }
}
