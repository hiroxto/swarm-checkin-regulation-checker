import type { AllLimitCheckResult } from "../types/app";
import CheckinDetail from "./checkin-detail";

interface Props {
  limitCheckResult: AllLimitCheckResult;
}

const CheckinDetails = (props: Props) => {
  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">
        チェックイン詳細
      </h2>

      {props.limitCheckResult.results.map((result, index) => (
        <CheckinDetail key={index} result={result}></CheckinDetail>
      ))}
    </div>
  );
};

export default CheckinDetails;
