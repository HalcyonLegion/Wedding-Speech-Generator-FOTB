import Head from "next/head";
import { useState } from "react";
import { Fragment } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [tone, setTone] = useState("");
  const [name, setName] = useState("");
  const [groom, setGroom] = useState("");
  const [bride, setBride] = useState("");
  const [event1, setEvent1] = useState("");
  const [event2, setEvent2] = useState("");
  const [childhood, setChildhood] = useState("");
  const [qualities, setQualities] = useState("");
  const [habits, setHabits] = useState("");
  const [tip, setTip] = useState("");
  const [story, setStory] = useState("");
  const [feeling123, setFeeling123] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          tone: tone,
          name: name,
          groom: groom,
          bride: bride,
          event: event1,
          event2: event2,
          childhood: childhood,
          qualities: qualities,
          habits: habits,
          tip: tip,
          story: story,
          feeling123: feeling123
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTone("");
      setName("");
      setGroom("");
      setBride("");
      setEvent1("");
      setEvent2("");
      setChildhood("");
      setQualities("");
      setHabits("");
      setTip("");
      setStory("");
      setFeeling123("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Wedding Speech Generator - Father of the Bride</title>
        <link rel="icon" href="\AI_SPEECHES.png" />
      </Head>

      <main className={styles.main}>
        <img src="\AI_SPEECHES.png" className={styles.icon} />
        <h3>Generate a Speech!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="tone"
            placeholder="What is the Tone of this Speech?"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="What is the Father's Name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="groom"
            placeholder="What is the Groom's Name?"
            value={groom}
            onChange={(e) => setGroom(e.target.value)}/>
          <input
            type="text"
            name="bride"
            placeholder="What is the Bride's Name?"
            value={bride}
            onChange={(e) => setBride(e.target.value)}/>
            <input
            type="text"
            name="event1"
            placeholder="What is a funny event you shared with your Daughter?"
            value={event1}
            onChange={(e) => setEvent1(e.target.value)}
          />
          <input
            type="text"
            name="event2"
            placeholder="What is a personal event you shared with your Daughter?"
            value={event2}
            onChange={(e) => setEvent2(e.target.value)}
          />
          <input
            type="text"
            name="childhood"
            placeholder="What was the Bride like as a child?"
            value={childhood}
            onChange={(e) => setChildhood(e.target.value)}/>
          <input
            type="text"
            name="qualities"
            placeholder="What are some of the Bride's qualities?"
            value={qualities}
            onChange={(e) => setQualities(e.target.value)}/>
            <input
            type="text"
            name="habits"
            placeholder="What are some of the Bride's worst habits?"
            value={habits}
            onChange={(e) => setHabits(e.target.value)}
          />
          <input
            type="text"
            name="tip"
            placeholder="What is a tip you'd like to offer the Groom?"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          />
          <input
            type="text"
            name="story"
            placeholder="What is a story about how you first met the Groom?"
            value={story}
            onChange={(e) => setStory(e.target.value)}/>
          <input
            type="text"
            name="feeling123"
            placeholder="What were 3 feelings you had about the Groom when you first met him?"
            value={feeling123}
            onChange={(e) => setFeeling123(e.target.value)}/>
          <input type="submit" value="Generate Speech" />
        </form>
        <div className={styles.result}>
        {result ? result.split('.').map((sentence, index) => (
        <Fragment key={index}>
        {sentence}.
        {index !== result.split('.').length - 1 && <br />}
        </Fragment>
        )) : 'No result to display'}
        </div>
      </main>
    </div>
  );
}
