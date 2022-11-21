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

  return (
    <div className="relative">
      <dt>
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
          { result.isLimited ? limitedIcon : notLimitedIcon }
        </div>
        <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
          { result.title } : {result.isLimited ? "規制中" : "規制されていません"}
        </p>
      </dt>
      <dd className="ml-16 text-base text-gray-500">
        対象チェックイン回数: { result.checkinsCount }
      </dd>
      <dd className="ml-16 text-base text-gray-500">
        対象チェックイン期間: { date2String(result.period.from) }
      </dd>
    </div>
  )
}

export default LimitCheckResult
