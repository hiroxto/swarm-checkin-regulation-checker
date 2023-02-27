import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {CheckinItem} from '../types/foursquare'
import Footer from "../components/footer";
import { AllLimitChecker } from "../lib/all-limit-checker";
import {AllLimitCheckResult} from "../types/app";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import { useRouter } from "next/router";
import CheckinDetails from "../components/checkin-details";
import LimitCheckResults from "../components/limit-check-results";
import NowDate from "../components/now-date";
dayjs.extend(timezone)
dayjs.extend(require('dayjs/plugin/utc'))

const Home: NextPage = () => {
  const ENDPOINT = 'https://api.foursquare.com/v2/users/self/checkins';
  const router = useRouter()
  const setViaQuery = useRef(false);
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
          console.log(response);
          throw new Error("APIコールでエラー");
        }

        return response.data.response.checkins.items;
      })
      .catch(e => {
        console.log(e);
        alert(e);
      })
  }

  const pullCheckins = async () => {
    const checkins = await getCheckins();
    setCheckins(checkins);
  }
  const checkLimits = async () => {
    const checker = new AllLimitChecker(checkins)
    const result = checker.check();
    setLimitCheckResult(result)
  }
  const pullAndCheckLimits = async () => {
    await pullCheckins();
    await checkLimits();
  }

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (!setViaQuery.current && router.query?.token) {
      setToken(String(router.query.token));
      setViaQuery.current = true
    }

    console.log(checkins);
  }, [router, token, checkins]);

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

        <div className="sticky top-0 z-50 mb-5 bg-white">
          <NowDate interval={1000}></NowDate>
          <div className="mt-1 sm:mt-1 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md">
              <button
                onClick={pullAndCheckLimits}
                disabled={token === ""}
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-base text-white hover:bg-indigo-700 disabled:opacity-75"
              >
                履歴取得
              </button>
            </div>
            <div className="rounded-md">
              <button
                onClick={checkLimits}
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-base text-white hover:bg-indigo-700 disabled:opacity-75"
              >
                再チェック
              </button>
            </div>
          </div>
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
              value={token}
              onChange={event => setToken(event.target.value)}
              type="text"
              name="oauth-token"
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Token"
            />
          </div>
        </div>

        { limitCheckResult !== null &&
          <LimitCheckResults allLimitCheckResult={limitCheckResult}></LimitCheckResults>
        }
        { limitCheckResult !== null &&
          <CheckinDetails limitCheckResult={limitCheckResult}></CheckinDetails>
        }
      </main>

      <Footer/>
    </div>
  )
}

export default Home
