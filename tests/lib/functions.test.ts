import { describe, it, expect } from "vitest";
import { createdAt2Date, date2String } from "../../lib/functions";
import { toZonedTime } from "date-fns-tz";

describe("date2String()", () => {
  it("日本時間のDateを日本時間の文字列にフォーマットできること", () => {
    const date = toZonedTime(new Date("2024-10-01T12:34:56+09:00"), "Asia/Tokyo");

    expect(date2String(date)).toBe("2024-10-01 12:34:56");
  });
});

describe("createdAt2Date()", () => {
  it("タイムスタンプをDateに変換できること", () => {
    const createdAt = 1728108666;
    const expected = new Date(createdAt * 1000);

    expect(createdAt2Date(createdAt)).toStrictEqual(expected);
  });
});
