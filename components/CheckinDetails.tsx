import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { CHECKIN_LIMIT_TITLES } from "~/lib/consts";
import type { AllLimitCheckResult, ResultKeys } from "~/types/app";
import CheckinDetail from "./CheckinDetail";

interface Props {
  limitCheckResult: AllLimitCheckResult;
  resultKeys: ResultKeys;
}

const CheckinDetails = ({ limitCheckResult, resultKeys }: Props) => {
  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">チェックイン詳細</h2>

      <Accordion type="multiple" defaultValue={resultKeys}>
        {resultKeys.map(resultKey => (
          <AccordionItem value={resultKey} key={resultKey}>
            <AccordionTrigger>
              {CHECKIN_LIMIT_TITLES[resultKey]} ({limitCheckResult.limits[resultKey].checkins.length}件)
            </AccordionTrigger>
            <AccordionContent>
              <CheckinDetail
                title={CHECKIN_LIMIT_TITLES[resultKey]}
                result={limitCheckResult.limits[resultKey]}
              ></CheckinDetail>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CheckinDetails;
