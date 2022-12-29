import dayjs from 'dayjs';

/**
 * Dateを表示用にフォーマットする
 *
 * @param date
 */
export const date2String = (date: Date | dayjs.Dayjs): string => dayjs(date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');

/**
 * Swarmのcreated_atをDayJsに変換する
 *
 * @param createdAt
 */
const createdAt2DayJs = (createdAt: number): dayjs.Dayjs => dayjs(createdAt * 1000);
