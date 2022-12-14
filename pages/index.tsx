import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChangeEvent, EventHandler, MouseEventHandler, useEffect, useState } from 'react'

export type tweet = {
  tweet: string,
  user: string,
}
export default function Home() {
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<{ name: string }>({ name: "" });
  const [tweets, setTweets] = useState<tweet[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("api/tweets", {
        method: "GET",
      });
      const data = await res.json();
      console.log("data: ");
      console.log(data);
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
      const fetchData = await fetch("api/tweets", {
        method: "POST",
        body: JSON.stringify({ tweet: tweet, user: name }),
      });
      const data: tweet[] = await fetchData.json();
      console.log(data);
      setTweets([...tweets, data[0]]);
    }
  }
  const handleDelete = async (event: any) => {
    const data = event.target.dataset as tweet
    const tweet = data.tweet;
    const user = data.user;
    // const del = await (fetch("api/tweets", {
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     tweet: tweet,
    //     user: user
    //   })
    // }))
    const temps = tweets.filter(t => !(t.tweet == tweet && t.user == user))
    setTweets(temps)
    console.log(tweet);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        {name ?
          <div className={styles.home}>
            <h1>Hello {name}</h1>
            <div id='tweets' className={styles.tweets}>
              {tweets.map((tweet, index) => {
                return (
                  <div key={index} className={styles.tweet}>
                    <h3>{tweet.user}</h3>
                    <p className={styles.tweetBody}>: {tweet.tweet}</p>
                    {tweet.user === name && <button data-user={tweet.user} data-tweet={tweet.tweet} onClick={(e: any) => handleDelete(e)}>Delete</button>}
                  </div>
                )
              })}
            </div>
            <div id='post-box' className={styles.postBox}>
              <input id='post-text' placeholder='What are you thinking?' onKeyDown={handleTweetKeyDown}></input>
            </div>
          </div>
          :
          <div className={styles.main}>
            <label htmlFor="name_input">What is your name?</label>
            <input id='name_input' onKeyDown={handleKeyDown}></input>
          </div>
        }
      </>

    </div>
  )
}
