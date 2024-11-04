import { add } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { describe, expect, it } from "vitest";
import { createdAt2Date, date2String, getClosestDate } from "../../lib/functions";

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

describe("getClosestDate()", () => {
  const now = new Date("2024-03-20T12:00:00Z");

  it("aの方が近い場合にaの日時を返すこと", () => {
    const a = add(now, { hours: 1 }); // 1時間後
    const b = add(now, { hours: 2 }); // 2時間後
    expect(getClosestDate(now, a, b)).toEqual(a);
  });

  it("bの方が近い場合にbの日時を返すこと", () => {
    const a = add(now, { hours: 2 }); // 2時間後
    const b = add(now, { hours: 1 }); // 1時間後
    expect(getClosestDate(now, a, b)).toEqual(b);
  });

  it("aとbが同一の場合にaの日時を返すこと", () => {
    const a = add(now, { hours: 1 }); // 1時間後
    const b = add(now, { hours: 1 }); // 1時間後
    expect(getClosestDate(now, a, b)).toEqual(a);
  });

  it("過去の日時でも正しく比較できること", () => {
    const a = add(now, { hours: -1 }); // 1時間前
    const b = add(now, { hours: -2 }); // 2時間前
    expect(getClosestDate(now, a, b)).toEqual(a);
  });
});
