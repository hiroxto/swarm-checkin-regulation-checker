import { CHECKIN_LIMIT_TITLES } from "~/lib/consts";
import type { AllLimitCheckResult } from "~/types/app";
import CheckinDetail from "./CheckinDetail";

interface Props {
  limitCheckResult: AllLimitCheckResult;
}

const CheckinDetails = (props: Props) => {
  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">チェックイン詳細</h2>

      <CheckinDetail title={CHECKIN_LIMIT_TITLES.m2} result={props.limitCheckResult.limits.m2}></CheckinDetail>
      <CheckinDetail title={CHECKIN_LIMIT_TITLES.m15} result={props.limitCheckResult.limits.m15}></CheckinDetail>
      <CheckinDetail title={CHECKIN_LIMIT_TITLES.d1} result={props.limitCheckResult.limits.d1}></CheckinDetail>
      <CheckinDetail title={CHECKIN_LIMIT_TITLES.d3} result={props.limitCheckResult.limits.d3}></CheckinDetail>
      <CheckinDetail title={CHECKIN_LIMIT_TITLES.d3d1} result={props.limitCheckResult.limits.d3d1}></CheckinDetail>
    </div>
  );
};

export default CheckinDetails;
