import { CHECKIN_LIMIT_TITLES } from "~/lib/consts";
import type { AllLimitCheckResult, ResultKeys } from "~/types/app";
import LimitCheckResult from "./limit-check-result";

interface Props {
  limitCheckResult: AllLimitCheckResult;
  resultKeys: ResultKeys;
}

const LimitCheckResults = ({ limitCheckResult, resultKeys }: Props) => {
  const notLimitedTextColor = "text-gray-900";
  const limitedTextColor = "text-red-500";
  const textColor = limitCheckResult.isLimited ? limitedTextColor : notLimitedTextColor;

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">規制状況</h2>
      <p className={`mb-2 ${textColor}`}>{limitCheckResult.isLimited ? "規制されています" : "規制されていません"}</p>

      <div className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
        {resultKeys.map(resultKey => (
          <LimitCheckResult
            title={CHECKIN_LIMIT_TITLES[resultKey]}
            limitCheckResult={limitCheckResult.limits[resultKey]}
            key={resultKey}
          ></LimitCheckResult>
        ))}
      </div>
    </div>
  );
};

export default LimitCheckResults;
