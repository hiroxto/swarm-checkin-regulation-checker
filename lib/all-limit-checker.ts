import type { CheckinItem } from "../types/foursquare";
import type { AllLimitCheckResult } from "../types/app";
import { Check2min } from "./check-2min";
import { Check15min } from "./check-15min";
import { Check1day } from "./check-1day";
import { Check3day } from "./check-3day";
import { Check3dayAnd1day } from "./check-3day-and-1day";

export class AllLimitChecker {
  constructor(private checkins: CheckinItem[]) {}

  check(): AllLimitCheckResult {
    const now = new Date();
    const check2min = new Check2min(this.checkins, now).check();
    const check15min = new Check15min(this.checkins, now).check();
    const check1day = new Check1day(this.checkins, now).check();
    const check3day = new Check3day(this.checkins, now).check();
    const check3dayAnd1day = new Check3dayAnd1day(this.checkins, now).check();

    console.log(check2min, check15min, check1day, check3day, check3dayAnd1day);
    const isLimited = [
      check2min.isLimited,
      check15min.isLimited,
      check1day.isLimited,
      check3day.isLimited && check3dayAnd1day.isLimited,
    ].some((v) => v);

    return {
      results: [check2min, check15min, check1day, check3day, check3dayAnd1day],
      isLimited,
    };
  }
}
