import Head from "next/head";
import MobileDivider from "../components/MobileDivider";
import DesktopDivider from "../components/DesktopDivider";
import DiceIcon from "../components/DiceIcon";
import { useState, useEffect } from "react";
import { useMedia } from "react-use";

export default function Home() {
  const isWide = useMedia("(min-width: 768px)", true);
  const [advice, setAdvice] = useState({});

  const fetchAdvice = async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="font-sans">
      <Head>
        <title>Advice Generator</title>
        <meta name="description" content="Generated by Rubén Frías" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-darkBlue h-screen flex flex-col justify-center">
        <div className="bg-darkGrayishBlue rounded-lg flex flex-col items-center gap-y-6 mx-3 md:max-w-lg md:mx-auto">
          <h1 className="text-neonGreen text-xs tracking-[0.3em] font-extrabold pt-10">
            {`ADVICE #${advice.id}`}
          </h1>
          <p className="text-lightCyan text-[28px] text-center font-extrabold px-3 md:px-8">
            {`"${advice.advice}"`}
          </p>
          <div className="pb-2">
            {isWide ? <DesktopDivider /> : <MobileDivider />}
          </div>
          <button
            onClick={() => fetchAdvice()}
            type="button"
            className="bg-neonGreen rounded-full p-4 -mb-7 hover:shadow-3xl"
          >
            <DiceIcon />
          </button>
        </div>
      </main>
    </div>
  );
}
