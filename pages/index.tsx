import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {useEffect, useState} from "react";
import {CheckinItem} from '../types/foursquare'
import Footer from "../components/footer";
import { LimitChecker } from "../lib/limit-checker";
import {AllLimitCheckResult} from "../types/app";
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)
dayjs.extend(require('dayjs/plugin/utc'))

const Home: NextPage = () => {
  const ENDPOINT = 'https://api.foursquare.com/v2/users/self/checkins';
  const [token, setToken] = useState<string>("");
  const [checkins, setCheckins] = useState<CheckinItem[]>([]);
  const [limitCheckResult, setLimitCheckResult] = useState<AllLimitCheckResult|null>(null);

  const getCheckins = (): Promise<CheckinItem[]> => {
    const params = {
      oauth_token: token,
      limit: 200,
      v: '20221016',
      lang: 'ja',
    }

    return axios.get(ENDPOINT, { params })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("APIコールでエラー");
        }

        return response.data.response.checkins.items;
      })
      .catch(e => {
        console.log(e);
      })
  }

  const checkLimits = async () => {
    const checkins = await getCheckins();
    setCheckins(checkins);
    const checker = new LimitChecker(checkins)
    const result = checker.check();
    setLimitCheckResult(result)
  }

  useEffect(() => {
    console.log(checkins)
  }, [token, checkins]);

  const notLimitedIcon = <CheckIcon className="h-6 w-6" aria-hidden="true" />
  const limitedIcon = <ExclamationTriangleIcon className="h-6 w-6 text-red-300" aria-hidden="true" />

  let resultContents;
  if (limitCheckResult === null) {
    resultContents = <div></div>
  } else {
    resultContents = (
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

  const viewCreatedAt = (createdAt: number) => dayjs(createdAt * 1000).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
  let checkinDetails;
  if (limitCheckResult === null) {
    checkinDetails = <div></div>
  } else {
    checkinDetails = (
      <div className="mt-10 mb-5">
        <h2 className="text-3xl font-semibold text-indigo-600">
          チェックイン詳細
        </h2>

        {limitCheckResult.results.map((result, index) => (
          <div key={index} className="mb-5">
            <h3 className="text-2xl font-semibold text-indigo-400">
              { result.title }
            </h3>
            <p className="mb-2">
              チェックイン数: {result.checkinsCount}
            </p>

            <table className="min-w-full text-center border hover:table-fixed">
              <thead className="border-b">
                <tr>
                  <th>Index</th>
                  <th>チェックイン日時</th>
                  <th>場所</th>
                </tr>
              </thead>
              {result.checkins.map((checkin, checkinIndex) => (
                <tr key={checkinIndex} className="hover:bg-gray-100 border-b">
                  <th className="border-r">
                    {checkinIndex}
                  </th>
                  <th className="border-r">
                    {viewCreatedAt(checkin.createdAt)}
                  </th>
                  <th className="border-r">
                    {checkin.venue.name}
                  </th>
                </tr>
              ))}
            </table>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white py-12 px-10">
      <Head>
        <title>Swarm コイン規制チェッカー</title>
        <meta name="description" content="Swarmでチェックインした際に貰えるコインが規制されているかを確認するツール" />
      </Head>

      <main>
        <div className="mb-5">
          <h1 className="text-4xl font-semibold text-indigo-600">
            Swarm コイン規制チェッカー
          </h1>

          <p>
            Swarmでチェックインした際に貰えるコインが規制されているかを確認するツール
          </p>
        </div>

        <div className="mb-5">
          <h2 className="text-3xl font-semibold text-indigo-600">
            設定
          </h2>
          <p className="mb-2">
            チェックイン履歴を取得するためにAPIトークンが必要です。
          </p>

          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            APIトークン
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              onChange={event => setToken(event.target.value)}
              type="text"
              name="oauth-token"
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Token"
            />
          </div>

          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md">
              <button
                onClick={checkLimits}
                disabled={token === ""}
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base text-white hover:bg-indigo-700 disabled:opacity-75"
              >
                規制状況を確認する
              </button>
            </div>
          </div>
        </div>

        { resultContents }
        { checkinDetails }
      </main>

      <Footer/>
    </div>
  )
}

export default Home
