import { endOfDay, startOfDay, subDays } from "date-fns";
import CheckinHistory from "~/components/CheckinHistory";
import type { CheckinItem } from "~/types/foursquare";

interface Props {
  checkins: CheckinItem[];
  now: Date;
}

const CheckinHistories = (props: Props) => {
  const d0start = startOfDay(props.now);
  const d0end = endOfDay(props.now);

  const d1 = subDays(props.now, 1);
  const d1start = startOfDay(d1);
  const d1end = endOfDay(d1);

  const d2 = subDays(props.now, 2);
  const d2start = startOfDay(d2);
  const d2end = endOfDay(d2);

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">
        チェックイン履歴
      </h2>

      <CheckinHistory
        title="本日のチェックイン一覧"
        now={props.now}
        checkins={props.checkins}
        periodFrom={d0start}
        periodTo={d0end}
      ></CheckinHistory>

      <CheckinHistory
        title="1日前のチェックイン一覧"
        now={props.now}
        checkins={props.checkins}
        periodFrom={d1start}
        periodTo={d1end}
      ></CheckinHistory>

      <CheckinHistory
        title="2日前のチェックイン一覧"
        now={props.now}
        checkins={props.checkins}
        periodFrom={d2start}
        periodTo={d2end}
      ></CheckinHistory>
    </div>
  );
};

export default CheckinHistories;
