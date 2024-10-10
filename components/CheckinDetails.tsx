import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { CHECKIN_LIMIT_TITLES } from "~/lib/consts";
import type { AllLimitCheckResult } from "~/types/app";
import CheckinDetail from "./CheckinDetail";

interface Props {
  limitCheckResult: AllLimitCheckResult;
}

const CheckinDetails = ({ limitCheckResult }: Props) => {
  const accordionValues = ["m2", "m15", "d1", "d3", "d3d1"];

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">チェックイン詳細</h2>

      <Accordion type="multiple" defaultValue={accordionValues}>
        <AccordionItem value="m2">
          <AccordionTrigger>
            {CHECKIN_LIMIT_TITLES.m2} ({limitCheckResult.limits.m2.checkins.length}件)
          </AccordionTrigger>
          <AccordionContent>
            <CheckinDetail title={CHECKIN_LIMIT_TITLES.m2} result={limitCheckResult.limits.m2}></CheckinDetail>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="m15">
          <AccordionTrigger>
            {CHECKIN_LIMIT_TITLES.m15} ({limitCheckResult.limits.m15.checkins.length}件)
          </AccordionTrigger>
          <AccordionContent>
            <CheckinDetail title={CHECKIN_LIMIT_TITLES.m15} result={limitCheckResult.limits.m15}></CheckinDetail>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="d1">
          <AccordionTrigger>
            {CHECKIN_LIMIT_TITLES.d1} ({limitCheckResult.limits.d1.checkins.length}件)
          </AccordionTrigger>
          <AccordionContent>
            <CheckinDetail title={CHECKIN_LIMIT_TITLES.d1} result={limitCheckResult.limits.d1}></CheckinDetail>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="d3">
          <AccordionTrigger>
            {CHECKIN_LIMIT_TITLES.d3} ({limitCheckResult.limits.d3.checkins.length}件)
          </AccordionTrigger>
          <AccordionContent>
            <CheckinDetail title={CHECKIN_LIMIT_TITLES.d3} result={limitCheckResult.limits.d3}></CheckinDetail>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="d3d1">
          <AccordionTrigger>
            {CHECKIN_LIMIT_TITLES.d3d1} ({limitCheckResult.limits.m15.checkins.length}件)
          </AccordionTrigger>
          <AccordionContent>
            <CheckinDetail title={CHECKIN_LIMIT_TITLES.d3d1} result={limitCheckResult.limits.d3d1}></CheckinDetail>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CheckinDetails;
