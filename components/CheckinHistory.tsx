import { isWithinInterval } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { createdAt2Date, date2String } from "~/lib/functions";
import type { CheckinItem } from "~/types/foursquare";

interface Props {
  title: string;
  now: Date;
  periodFrom: Date;
  periodTo: Date;
  checkins: CheckinItem[];
}

const CheckinHistory = (props: Props) => {
  const targetCheckins = props.checkins.filter(checkin =>
    isWithinInterval(createdAt2Date(checkin.createdAt), {
      start: props.periodFrom,
      end: props.periodTo,
    }),
  );

  return (
    <div className="mb-5">
      <div className="sticky top-28 z-10 bg-white">
        <h3 className="text-2xl font-semibold text-indigo-400">{props.title}</h3>
        <p>チェックイン数: {targetCheckins.length}</p>
        <p className="mb-2">
          期間: {date2String(props.periodFrom)} から {date2String(props.periodTo)} まで
        </p>

        <Table className="min-w-full border">
          <TableHeader className="border">
            <TableRow className="border bg-gray-100">
              <TableHead className="p-1.5 leading-1 border-r w-0">No.</TableHead>
              <TableHead className="p-1.5 leading-1 border-r">チェックイン日時</TableHead>
              <TableHead className="p-1.5 leading-1 border-r">場所</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targetCheckins.map((checkin, checkinIndex) => (
              <TableRow key={checkin.id}>
                <TableCell className="p-1 leading-1 border-r">{checkinIndex + 1}</TableCell>
                <TableCell className="p-1 leading-1 border-r">
                  {date2String(createdAt2Date(checkin.createdAt))}
                </TableCell>
                <TableCell className="p-1 leading-1 border-r">{checkin.venue.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CheckinHistory;
