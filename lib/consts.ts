import type { CheckinLimits, ResultKeys } from "~/types/app";

type CheckinLimitTitles = {
  [K in keyof CheckinLimits]: string;
};

export const CHECKIN_LIMIT_TITLES: CheckinLimitTitles = {
  m2: "2分間に5回のチェックイン",
  m15: "15分間に8回のチェックイン",
  d1: "1日(24時間)に50回のチェックイン",
  d3: "3日(72時間)に90回のチェックイン",
  d3d1: "1日(24時間)に30回のチェックイン",
} as const;

export const RESULT_KEYS: ResultKeys = ["m2", "m15", "d1", "d3", "d3d1"] as const;
