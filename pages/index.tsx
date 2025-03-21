import { useAtom } from "jotai";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { tokenAtom } from "~/atoms/FoursquareAtom";
import CheckinDetails from "~/components/CheckinDetails";
import CheckinHistories from "~/components/CheckinHistories";
import CurrentTime from "~/components/CurrentTime";
import LimitCheckResults from "~/components/limit-check-results";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { RESULT_KEYS } from "~/lib/consts";
import { checkAllLimits, date2String } from "~/lib/functions";
import { FoursquareClient } from "~/lib/infra/foursquare";
import type { AllLimitCheckResult } from "~/types/app";
import type { CheckinItem } from "~/types/foursquare";

const Home: NextPage = () => {
  const router = useRouter();
  const setViaQuery = useRef(false);
  const [token, setToken] = useAtom(tokenAtom);
  const [checkins, setCheckins] = useState<CheckinItem[]>([]);
  const [limitCheckResult, setLimitCheckResult] = useState<AllLimitCheckResult>(checkAllLimits([], new Date()));

  const pullCheckins = async () => {
    try {
      const client = new FoursquareClient(token);
      const checkins = await client.getSelfCheckins();
      setCheckins(checkins);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  const checkLimits = useCallback(() => {
    const result = checkAllLimits(checkins, new Date());
    setLimitCheckResult(result);
  }, [checkins]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!setViaQuery.current && router.query?.token) {
      setToken(String(router.query.token));
      setViaQuery.current = true;
    }

    const id = setInterval(() => {
      checkLimits();
    }, 1000);

    return () => clearInterval(id);
  }, [router, checkLimits, setToken]);

  return (
    <div className="bg-white px-5 py-5">
      <Head>
        <title>Swarm コイン規制チェッカー</title>
        <meta content="Swarmでチェックインした際に貰えるコインが規制されているかを確認するツール" name="description" />
        <meta content="telephone=no" name="format-detection" />
      </Head>

      <main className="relative">
        <div className="mb-5">
          <h1 className="text-4xl font-semibold text-indigo-600">Swarm コイン規制チェッカー</h1>

          <p>Swarmでチェックインした際に貰えるコインが規制されているかを確認するツール</p>
        </div>

        <div className="sticky top-0 z-30 bg-white pb-3">
          <p className={`${limitCheckResult.isLimited ? "text-red-500" : "text-gray-900"}`}>
            {limitCheckResult.isLimited ? "規制されています" : "規制されていません"}
          </p>
          <p className={`${limitCheckResult.isLimited ? "text-red-500" : "text-gray-900"}`}>
            規制解除日時: {limitCheckResult.unLimitingAts == null ? "N/A" : date2String(limitCheckResult.unLimitingAts)}
          </p>

          <CurrentTime></CurrentTime>

          <div className="buttons mt-1">
            <Button
              className="rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-base text-white hover:bg-indigo-700"
              size="lg"
              disabled={token === ""}
              onClick={pullCheckins}
            >
              履歴取得
            </Button>
          </div>
        </div>

        <Tabs defaultValue="limits">
          <TabsList>
            <TabsTrigger value="limits">規制状況</TabsTrigger>
            <TabsTrigger value="history">チェックイン履歴</TabsTrigger>
            <TabsTrigger value="setting">設定</TabsTrigger>
          </TabsList>
          <TabsContent value="limits">
            <LimitCheckResults limitCheckResult={limitCheckResult} resultKeys={RESULT_KEYS}></LimitCheckResults>
            <CheckinDetails limitCheckResult={limitCheckResult} resultKeys={RESULT_KEYS}></CheckinDetails>
          </TabsContent>
          <TabsContent value="history">
            <CheckinHistories checkins={checkins} now={new Date()}></CheckinHistories>
          </TabsContent>
          <TabsContent value="setting">
            <div className="mt-10 mb-5">
              <h2 className="text-3xl font-semibold text-indigo-600">設定</h2>

              <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                APIトークン
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                  name="oauth-token"
                  onChange={event => setToken(event.target.value)}
                  placeholder="Token"
                  type="text"
                  value={token}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
