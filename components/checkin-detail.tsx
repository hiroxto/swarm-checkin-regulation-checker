import { add } from "date-fns";
import { createdAt2Date, date2String, periodToDuration } from "~/lib/functions";
import type { LimitCheckResult } from "~/types/app";

interface Props {
  result: LimitCheckResult;
}

const CheckinDetail = (props: Props) => {
  const result = props.result;
  const computeLimitDay = (createdAt: number) => {
    const date = add(
      createdAt2Date(createdAt),
      periodToDuration(result.period.value, result.period.unit),
    );

    return date2String(date);
  };
  const isLimited = (checkinNumber: number) => checkinNumber >= result.limit;

  return (
    <div className="mb-5">
      <div className="sticky top-28 z-10 bg-white">
        <h3 className="text-2xl font-semibold text-indigo-400">
          {result.title}
        </h3>
        <p>チェックイン数: {result.checkinsCount}</p>
        <p className="mb-2">
          期間: {date2String(result.period.from)} から{" "}
          {date2String(result.period.to)} まで
        </p>
      </div>

      <table className="min-w-full text-center border hover:table-fixed">
        <thead className="border">
          <tr className="border bg-gray-100">
            <th className="border-r">Index</th>
            <th className="border-r">チェックイン日時</th>
            <th className="border-r">場所</th>
            <th className="border-r">規制解除日時</th>
          </tr>
        </thead>
        <tbody>
          {result.checkins.map((checkin, checkinIndex) => (
            <tr
              className={
                isLimited(checkinIndex + 1)
                  ? "bg-red-100 hover:bg-red-200 border"
                  : "hover:bg-gray-100 border"
              }
              key={checkin.id}
            >
              <th className="border-r">{checkinIndex + 1}</th>
              <th className="border-r">
                {date2String(createdAt2Date(checkin.createdAt))}
              </th>
              <th className="border-r">{checkin.venue.name}</th>
              <th className="border-r">{computeLimitDay(checkin.createdAt)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckinDetail;
