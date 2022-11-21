import {LimitCheckResult} from "../types/app";
import dayjs from "dayjs";
import {date2String} from "../lib/functions";

interface Props {
  result: LimitCheckResult
}

const CheckinDetail  = (props: Props) => {
  const result = props.result;
  const viewCreatedAt = (createdAt: number) => dayjs(createdAt * 1000).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");

  return (
    <div className="mb-5">
      <h3 className="text-2xl font-semibold text-indigo-400">
        { result.title }
      </h3>
      <p>
        チェックイン数: {result.checkinsCount}
      </p>
      <p className="mb-2">
        期間: {date2String(result.period.from)} から {date2String(result.period.to)} まで
      </p>

      <table className="min-w-full text-center border hover:table-fixed">
        <thead className="border-b">
        <tr>
          <th>Index</th>
          <th>チェックイン日時</th>
          <th>場所</th>
        </tr>
        </thead>
        <tbody>
        {result.checkins.map((checkin, checkinIndex) => (
          <tr key={checkinIndex} className="hover:bg-gray-100 border-b">
            <th className="border-r">
              {checkinIndex + 1}
            </th>
            <th className="border-r">
              {viewCreatedAt(checkin.createdAt)}
            </th>
            <th className="border-r">
              {checkin.venue.name}
            </th>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default CheckinDetail
