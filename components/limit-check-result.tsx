import {LimitCheckResult} from "../types/app";
import {CheckIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {date2String} from "../lib/functions"

interface Props {
  limitCheckResult: LimitCheckResult
}

const LimitCheckResult  = (props: Props) => {
  const result = props.limitCheckResult;
  const notLimitedIcon = <CheckIcon className="h-6 w-6" aria-hidden="true" />
  const limitedIcon = <ExclamationTriangleIcon className="h-6 w-6 text-red-300" aria-hidden="true" />
  const notLimitedTextColor = 'text-gray-900';
  const limitedTextColor = 'text-red-500';
  const textColor = result.isLimited ? limitedTextColor : notLimitedTextColor;

  return (
    <div className="relative">
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
        { result.isLimited ? limitedIcon : notLimitedIcon }
      </div>
      <p className={`ml-16 text-lg font-medium leading-6 ${textColor}`}>
        { result.title } : {result.isLimited ? "規制中" : "規制されていません"}
      </p>

      <div className={`ml-16 text-base ${textColor}`}>
        対象チェックイン回数: { result.checkinsCount }
      </div>
      <div className={`ml-16 text-base ${textColor}`}>
        対象チェックイン期間: { date2String(result.period.from) }
      </div>
    </div>
  )
}

export default LimitCheckResult
