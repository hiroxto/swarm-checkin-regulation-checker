import { format } from "date-fns-tz";
import type { Duration } from "date-fns/types";
import type { PeriodUnit } from "~/types/app";

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
