import { endOfDay, isWithinInterval, startOfDay, subDays } from "date-fns";
import CheckinHistory from "~/components/CheckinHistory";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { createdAt2Date } from "~/lib/functions";
import type { CheckinItem } from "~/types/foursquare";

interface Props {
  checkins: CheckinItem[];
  now: Date;
}

const CheckinHistories = ({ checkins, now }: Props) => {
  const filterCheckins = (checkins: CheckinItem[], periodFrom: Date, periodEnd: Date) =>
    checkins.filter(checkin =>
      isWithinInterval(createdAt2Date(checkin.createdAt), { start: periodFrom, end: periodEnd }),
    );

  const d0start = startOfDay(now);
  const d0end = endOfDay(now);
  const d0checkins = filterCheckins(checkins, d0start, d0end);

  const d1 = subDays(now, 1);
  const d1start = startOfDay(d1);
  const d1end = endOfDay(d1);
  const d1checkins = filterCheckins(checkins, d1start, d1end);

  const d2 = subDays(now, 2);
  const d2start = startOfDay(d2);
  const d2end = endOfDay(d2);
  const d2checkins = filterCheckins(checkins, d2start, d2end);

  const defaultValue = ["d0", "d1", "d2"];
  const targets = [
    {
      key: "d0",
      title: "本日のチェックイン一覧",
      periodFrom: d0start,
      periodTo: d0end,
      checkins: d0checkins,
    },
    {
      key: "d1",
      title: "1日前のチェックイン一覧",
      periodFrom: d1start,
      periodTo: d1end,
      checkins: d1checkins,
    },
    {
      key: "d2",
      title: "2日前のチェックイン一覧",
      periodFrom: d2start,
      periodTo: d2end,
      checkins: d2checkins,
    },
  ];

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">チェックイン履歴</h2>

      <Accordion type="multiple" defaultValue={defaultValue}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {targets.map(target => (
            <AccordionItem value={target.key} key={target.key}>
              <AccordionTrigger>
                {target.title} ({target.checkins.length}件)
              </AccordionTrigger>
              <AccordionContent>
                <CheckinHistory
                  title={target.title}
                  now={now}
                  checkins={target.checkins}
                  periodFrom={target.periodFrom}
                  periodTo={target.periodTo}
                ></CheckinHistory>
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default CheckinHistories;
