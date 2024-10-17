import { endOfDay, startOfDay, subDays } from "date-fns";
import CheckinHistory from "~/components/CheckinHistory";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { CheckinItem } from "~/types/foursquare";

interface Props {
  checkins: CheckinItem[];
  now: Date;
}

const CheckinHistories = ({ checkins, now }: Props) => {
  const d0start = startOfDay(now);
  const d0end = endOfDay(now);

  const d1 = subDays(now, 1);
  const d1start = startOfDay(d1);
  const d1end = endOfDay(d1);

  const d2 = subDays(now, 2);
  const d2start = startOfDay(d2);
  const d2end = endOfDay(d2);

  const defaultValue = ["d0", "d1", "d2"];
  const targets = [
    {
      key: "d0",
      title: "本日のチェックイン一覧",
      periodFrom: d0start,
      periodTo: d0end,
    },
    {
      key: "d1",
      title: "1日前のチェックイン一覧",
      periodFrom: d1start,
      periodTo: d1end,
    },
    {
      key: "d2",
      title: "2日前のチェックイン一覧",
      periodFrom: d2start,
      periodTo: d2end,
    },
  ];

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">チェックイン履歴</h2>

      <Accordion type="multiple" defaultValue={defaultValue}>
        {targets.map(target => (
          <AccordionItem value={target.key} key={target.key}>
            <AccordionTrigger>{target.title}</AccordionTrigger>
            <AccordionContent>
              <CheckinHistory
                title={target.title}
                now={now}
                checkins={checkins}
                periodFrom={target.periodFrom}
                periodTo={target.periodTo}
              ></CheckinHistory>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CheckinHistories;
