import { useRouter } from "next/router";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Footer from "../../components/Footer";
import Title from "../../components/pages/game/Title";
import Content from "../../components/pages/game/Content";
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
      <Header activeKey={0} />
      <div className="mb-auto">
        <SubHeader />
        <Title name={name} />
        <Content name={name} />
      </div>
      <Footer />
    </div>
  );
}