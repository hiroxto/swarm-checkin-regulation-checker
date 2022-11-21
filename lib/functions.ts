import dayjs from "dayjs";

export const date2String = (date: Date) => dayjs(date).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
