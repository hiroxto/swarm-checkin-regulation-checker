import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {CheckinItem, Response} from '../types/foursquare'

const Home: NextPage = () => {
  const ENDPOINT = 'https://api.foursquare.com/v2/users/self/checkins';
  const [token, setToken] = useState<string>("");
  const [checkins, setCheckins] = useState<CheckinItem[]>([]);

  const getCheckins = () => {
    const params = {
      oauth_token: token,
      limit: 100,
      v: '20221016',
      lang: 'ja',
    }

    axios.get<Response>(ENDPOINT, { params })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("APIコールでエラー");
        }

        setCheckins(response.data.response.checkins.items)
        return response.data
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    console.log(checkins)
  }, [token, checkins]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Swarm コイン規制チェッカー</title>
        <meta name="description" content="Swarmでチェックインした際に貰えるコインが規制されているかを確認するツール" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Swarm コイン規制チェッカー
        </h1>

        <p className={styles.description}>
          Swarmでチェックインした際に貰えるコインが規制されているかを確認するツール
        </p>

        <input type="text" placeholder="Oauth token" onChange={event => setToken(event.target.value)}>
        </input>

        <button onClick={getCheckins}>
          規制状況を確認する
        </button>
      </main>

      <footer className={styles.footer}>
        Developed by hiroxto
      </footer>
    </div>
  )
}

export default Home
