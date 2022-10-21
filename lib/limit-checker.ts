import {CheckinItem} from "../types/foursquare";
import {LimitCheckResult} from "../types/app";
import {Check2min} from "./check-2min";
import {Check15min} from "./check-15min";
import {Check1day} from "./check-1day";
import {Check3day} from "./check-3day";
import {Check3dayAnd1day} from "./check-3day-and-1day";

export class LimitChecker {
  constructor(private checkins: CheckinItem[]) {
  }

  check (): LimitCheckResult[] {
    const now = new Date();
    const check2min = new Check2min(this.checkins, now)
    const check15min = new Check15min(this.checkins, now)
    const check1day = new Check1day(this.checkins, now)
    const check3day = new Check3day(this.checkins, now)
    const check3dayAnd1day = new Check3dayAnd1day(this.checkins, now)

    console.log(check2min.check())
    console.log(check15min.check())
    console.log(check1day.check())
    console.log(check3day.check())
    console.log(check3dayAnd1day.check())

    return [
    ]
  }
}
