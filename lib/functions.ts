import { add, isAfter, sub } from "date-fns";
import { format } from "date-fns-tz";
import type { Duration } from "date-fns/types";
import type {
  AllLimitCheckResult,
  LimitCheckResult,
  PeriodUnit,
} from "~/types/app";
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
 * 指定した期間内のチェックイン規制に引っ掛かっているかを確認する
 */
export const checkLimits = (
  checkins: CheckinItem[],
  now: Date,
  checkinLimit: number,
  periodValue: number,
  periodUnit: PeriodUnit,
): LimitCheckResult => {
  const duration = periodToDuration(periodValue, periodUnit);
  const limitDate = sub(now, duration);
  const limitingCheckins = checkins.filter(checkin =>
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

/**
 * Swarmの規制に引っ掛かっているかを確認する
 */
export const checkAllLimits = (
  checkins: CheckinItem[],
  now: Date,
): AllLimitCheckResult => {
  const m2 = checkLimits(checkins, now, 5, 2, "minutes");
  const m15 = checkLimits(checkins, now, 8, 15, "minutes");
  const d1 = checkLimits(checkins, now, 50, 1, "days");
  const d3 = checkLimits(checkins, now, 90, 3, "days");
  const d3d1 = checkLimits(checkins, now, 30, 1, "days");

  const isLimited = [
    m2.isLimited,
    m15.isLimited,
    d1.isLimited,
    d3.isLimited && d3d1.isLimited,
  ].some(v => v);

  return {
    limits: {
      m2,
      m15,
      d1,
      d3,
      d3d1,
    },
    isLimited,
  };
};
