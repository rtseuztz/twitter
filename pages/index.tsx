import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Home() {
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<{ name: string }>({ name: "" });
  const [tweets, setTweets] = useState<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("api/tweets");
      const data = await res.json();
      setTweets(data);
    }
    fetchData();
  }, []);
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setName(event.target.value);
    }
  }
  const handleTweetKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      const tweet = event.target.value;
      await fetch("api/tweet", {
        method: "POST",
        body: JSON.stringify({ tweet }),
      });
      setTweets([...tweets, tweet]);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <>
          {name ?
            <div>
              <h1>Hello {name}</h1>
              <div id='tweets'>
                {tweets.map((tweet, index) => <div key={index}>{tweet}</div>)}
              </div>
              <div id='post-box'>
                <input id='post-text' placeholder='What are you thinking?' onKeyDown={handleTweetKeyDown}></input>
              </div>
            </div>
            :
            <div>
              <label htmlFor="name_input">What is your name?</label>
              <input id='name_input' onKeyDown={handleKeyDown}></input>
            </div>
          }
        </>
      </main>

    </div>
  )
}
