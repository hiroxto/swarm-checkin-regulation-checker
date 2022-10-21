import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {useEffect, useState} from "react";
import {CheckinItem} from '../types/foursquare'
import Footer from "../components/footer";
import { LimitChecker } from "../lib/limit-checker";
import {AllLimitCheckResult} from "../types/app";
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Home: NextPage = () => {
  const ENDPOINT = 'https://api.foursquare.com/v2/users/self/checkins';
  const [token, setToken] = useState<string>("");
  const [checkins, setCheckins] = useState<CheckinItem[]>([]);
  const [limitCheckResult, setLimitCheckResult] = useState<AllLimitCheckResult|null>(null);

  const getCheckins = (): Promise<CheckinItem[]> => {
    const params = {
      oauth_token: token,
      limit: 100,
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
      </main>

      <Footer/>
    </div>
  )
}

export default Home
