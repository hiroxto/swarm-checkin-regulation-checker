import { add, differenceInMilliseconds, isAfter, isBefore, sub } from "date-fns";
import { format } from "date-fns-tz";
import type { Duration } from "date-fns/types";
import type { AllLimitCheckResult, LimitCheckResult, PeriodUnit } from "~/types/app";
import type { CheckinItem } from "~/types/foursquare";

/**
 * Dateを表示用にフォーマットする
 */
export const date2String = (date: Date): string => format(date, "yyyy-MM-dd HH:mm:ss", { timeZone: "Asia/Tokyo" });

/**
 * Swarmのcreated_atをDateに変換する
 */
export const createdAt2Date = (createdAt: number): Date => new Date(createdAt * 1000);

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
  const limitingCheckins = checkins.filter(checkin => isAfter(createdAt2Date(checkin.createdAt), limitDate));
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
    unLimitingAt: thresholdCheckin == null ? null : add(createdAt2Date(thresholdCheckin.createdAt), duration),
  };
};

/**
 * Swarmの規制に引っ掛かっているかを確認する
 */
export const checkAllLimits = (checkins: CheckinItem[], now: Date): AllLimitCheckResult => {
  const m2 = checkLimits(checkins, now, 5, 2, "minutes");
  const m15 = checkLimits(checkins, now, 8, 15, "minutes");
  const d1 = checkLimits(checkins, now, 50, 1, "days");
  const d3 = checkLimits(checkins, now, 90, 3, "days");
  const d3d1 = checkLimits(checkins, now, 30, 1, "days");

  const isLimited = [m2.isLimited, m15.isLimited, d1.isLimited, d3.isLimited && d3d1.isLimited].some(v => v);
  const unLimitingAts = [
    m2.unLimitingAt,
    m15.unLimitingAt,
    d1.unLimitingAt,
    // d3とd3d1のunLimitingAtのうち，近い方の日付を使う
    getClosestDate(now, d3.unLimitingAt, d3d1.unLimitingAt),
  ].filter(v => !!v);

  return {
    limits: {
      m2,
      m15,
      d1,
      d3,
      d3d1,
    },
    isLimited,
    unLimitingAts: getMostFurthestDate(unLimitingAts, now),
  };
};

/**
 * 現在日時から近い方の日付を返す
 */
export const getClosestDate = (now: Date, a: Date | null, b: Date | null): Date | null => {
  // 両方がnullの場合は null を返す
  if (!a && !b) {
    return null;
  }

  // 片方のみ null の場合もう片方を返す
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }

  // aが現在日時に近いか
  const isAisCloser = isBefore(a, b) ? isAfter(a, now) : isAfter(b, now);

  return isAisCloser ? a : b;
};

/**
 * 現在日時から最も遠い日時を返す
 */
export const getMostFurthestDate = (dates: Date[], now: Date): Date | null => {
  // 日付がない場合は null を返す
  if (dates.length === 0) {
    return null;
  }

  // 最も遠い日時を探す
  let furthestDate = dates[0];
  let maxDifference = Math.abs(differenceInMilliseconds(furthestDate, now));

  for (const date of dates) {
    const diff = Math.abs(differenceInMilliseconds(date, now));

    if (diff > maxDifference) {
      maxDifference = diff;
      furthestDate = date;
    }
  }

  return furthestDate;
};
