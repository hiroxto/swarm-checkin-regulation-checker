import { CHECKIN_LIMIT_TITLES } from "~/lib/consts";
import type { AllLimitCheckResult } from "~/types/app";
import LimitCheckResult from "./limit-check-result";

interface Props {
  allLimitCheckResult: AllLimitCheckResult;
}

const LimitCheckResults = (props: Props) => {
  const limitCheckResult = props.allLimitCheckResult;
  const notLimitedTextColor = "text-gray-900";
  const limitedTextColor = "text-red-500";
  const textColor = limitCheckResult.isLimited
    ? limitedTextColor
    : notLimitedTextColor;

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">規制状況</h2>
      <p className={`mb-2 ${textColor}`}>
        {limitCheckResult.isLimited ? "規制されています" : "規制されていません"}
      </p>

      <div className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
        <LimitCheckResult
          title={CHECKIN_LIMIT_TITLES.m2}
          limitCheckResult={limitCheckResult.limits.m2}
        ></LimitCheckResult>
        <LimitCheckResult
          title={CHECKIN_LIMIT_TITLES.m15}
          limitCheckResult={limitCheckResult.limits.m15}
        ></LimitCheckResult>
        <LimitCheckResult
          title={CHECKIN_LIMIT_TITLES.d1}
          limitCheckResult={limitCheckResult.limits.d1}
        ></LimitCheckResult>
        <LimitCheckResult
          title={CHECKIN_LIMIT_TITLES.d3}
          limitCheckResult={limitCheckResult.limits.d3}
        ></LimitCheckResult>
        <LimitCheckResult
          title={CHECKIN_LIMIT_TITLES.d3d1}
          limitCheckResult={limitCheckResult.limits.d3d1}
        ></LimitCheckResult>
      </div>
    </div>
  );
};

export default LimitCheckResults;
