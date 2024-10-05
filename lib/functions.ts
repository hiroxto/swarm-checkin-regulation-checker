import { format } from "date-fns-tz";

/**
 * Dateを表示用にフォーマットする
 */
export const date2String = (date: Date): string =>
  format(date, "yyyy-MM-dd HH:mm:ss", { timeZone: "Asia/Tokyo" });

/**
 * Swarmのcreated_atをDateに変換する
 */
export const createdAt2Date = (createdAt: number): Date => new Date(createdAt * 1000);
