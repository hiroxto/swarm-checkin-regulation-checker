import { add, isAfter, sub } from "date-fns";
import { format } from "date-fns-tz";
import type { Duration } from "date-fns/types";
import type { NewLimitCheckResult, PeriodUnit } from "~/types/app";
import type { CheckinItem } from "~/types/foursquare";

/**
 * Dateを表示用にフォーマットする
 */
export const date2String = (date: Date): string =>
  format(date, "yyyy-MM-dd HH:mm:ss", { timeZone: "Asia/Tokyo" });

/**
 * Swarmのcreated_atをDateに変換する
 */
export const createdAt2Date = (createdAt: number): Date =>
  new Date(createdAt * 1000);

export const periodToDuration = (value: number, unit: PeriodUnit): Duration => {
  switch (unit) {
    case "minutes":
      return {
        minutes: value,
      };
    case "days":
      return {
        days: value,
      };
  }
};

/**
 * チェックイン規制に引っ掛かっているかを確認する
 */
export const checkLimits = (
  checkins: CheckinItem[],
  now: Date,
  checkinLimit: number,
  periodValue: number,
  periodUnit: PeriodUnit,
): NewLimitCheckResult => {
  const duration = periodToDuration(periodValue, periodUnit);
  const limitDate = sub(now, duration);
  const limitingCheckins = checkins.filter((checkin) =>
    isAfter(createdAt2Date(checkin.createdAt), limitDate),
  );
  const thresholdCheckin = limitingCheckins[checkinLimit - 1];

  return {
    limit: checkinLimit,
    checkins: limitingCheckins,
    period: {
      from: limitDate,
      to: now,
      value: periodValue,
      unit: periodUnit,
    },
    isLimited: limitingCheckins.length >= checkinLimit,
    unLimitingAt:
      thresholdCheckin == null
        ? null
        : add(createdAt2Date(thresholdCheckin.createdAt), duration),
  };
};
