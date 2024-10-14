import { add } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { createdAt2Date, date2String, periodToDuration } from "~/lib/functions";
import type { LimitCheckResult } from "~/types/app";

interface Props {
  title: string;
  result: LimitCheckResult;
}

const CheckinDetail = ({ title, result }: Props) => {
  const computeLimitDay = (createdAt: number) => {
    const date = add(createdAt2Date(createdAt), periodToDuration(result.period.value, result.period.unit));

    return date2String(date);
  };
  const isLimited = (checkinNumber: number) => checkinNumber >= result.limit;

  return (
    <div className="mb-5">
      <div>
        <h3 className="text-2xl font-semibold text-indigo-400">{title}</h3>
        <p>チェックイン数: {result.checkins.length}</p>
        <p className="mb-2" suppressHydrationWarning={true}>
          期間: {date2String(result.period.from)} から {date2String(result.period.to)} まで
        </p>
      </div>

      <Table className="min-w-full border">
        <TableHeader className="border">
          <TableRow className="border bg-gray-100">
            <TableHead className="p-1 leading-1 border-r w-0">No.</TableHead>
            <TableHead className="p-1 leading-1 border-r">チェックイン日時</TableHead>
            <TableHead className="p-1 leading-1 border-r">ベニュー名</TableHead>
            <TableHead className="p-1 leading-1 border-r">規制解除日時</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.checkins.map((checkin, checkinIndex) => (
            <TableRow
              key={checkin.id}
              className={
                isLimited(checkinIndex + 1) ? "bg-red-100 hover:bg-red-200 border" : "hover:bg-gray-100 border"
              }
            >
              <TableCell className="p-1 leading-1 border-r">{checkinIndex + 1}</TableCell>
              <TableCell className="p-1 leading-1 border-r">{date2String(createdAt2Date(checkin.createdAt))}</TableCell>
              <TableCell className="p-1 leading-1 border-r">{checkin.venue.name}</TableCell>
              <TableCell className="p-1 leading-1 border-r">{computeLimitDay(checkin.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CheckinDetail;
