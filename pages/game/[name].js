import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GamePageBody from "../../components/pages/game/GamePageBody";
import { useEffect, useState } from "react";

export default function Game() {
  const router = useRouter();
  const [name, setName] = useState();

  useEffect(() => {
    if (router.isReady) {
      setName(router.query.name.replaceAll("-", " "))
    }
  }, [router])

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Header activeKey="/" />
      <div className="mb-auto pb-4">
        <GamePageBody name={name} />
      </div>
      <Footer/>
    </div>
  );
}