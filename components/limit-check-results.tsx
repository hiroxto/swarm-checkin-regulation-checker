import {AllLimitCheckResult} from "../types/app";
import {CheckIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";

interface Props {
  allLimitCheckResult: AllLimitCheckResult
}

const LimitCheckResults  = (props: Props) => {
  const limitCheckResult = props.allLimitCheckResult;
  const notLimitedIcon = <CheckIcon className="h-6 w-6" aria-hidden="true" />
  const limitedIcon = <ExclamationTriangleIcon className="h-6 w-6 text-red-300" aria-hidden="true" />

  return (
    <div className="mt-10 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-600">
        規制状況
      </h2>
      <p className="mb-2">
        { limitCheckResult.isLimited ? "規制されています" : "規制されていません" }
      </p>

      <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
        {limitCheckResult.results.map((result, index) => (
          <div key={index} className="relative">
            <dt>
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                { result.isLimited ? limitedIcon : notLimitedIcon }
              </div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                { result.title } : {result.isLimited ? "規制中" : "規制されていません"}
              </p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              対象チェックイン回数: { result.checkinsCount }
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default LimitCheckResults
