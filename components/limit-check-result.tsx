import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { date2String } from "~/lib/functions";
import type { LimitCheckResult as LimitCheckResultType } from "~/types/app";

interface Props {
  title: string;
  limitCheckResult: LimitCheckResultType;
}

const LimitCheckResult = (props: Props) => {
  const notLimitedIcon = <CheckIcon aria-hidden="true" className="h-6 w-6" />;
  const limitedIcon = (
    <ExclamationTriangleIcon
      aria-hidden="true"
      className="h-6 w-6 text-red-300"
    />
  );
  const notLimitedTextColor = "text-gray-900";
  const limitedTextColor = "text-red-500";
  const textColor = props.limitCheckResult.isLimited
    ? limitedTextColor
    : notLimitedTextColor;

  return (
    <div className="relative">
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
        {props.limitCheckResult.isLimited ? limitedIcon : notLimitedIcon}
      </div>
      <p className={`ml-16 text-lg font-medium leading-6 ${textColor}`}>
        {props.title} :{" "}
        {props.limitCheckResult.isLimited ? "規制中" : "規制されていません"}
      </p>

      <div className={`ml-16 text-base ${textColor}`}>
        対象チェックイン回数: {props.limitCheckResult.checkins.length}
      </div>
      <div className={`ml-16 text-base ${textColor}`}>
        対象チェックイン期間: {date2String(props.limitCheckResult.period.from)}
      </div>
      <div className={`ml-16 text-base ${textColor}`}>
        規制解除:{" "}
        {props.limitCheckResult.unLimitingAt == null
          ? "N/A"
          : date2String(props.limitCheckResult.unLimitingAt)}
      </div>
    </div>
  );
};

export default LimitCheckResult;
