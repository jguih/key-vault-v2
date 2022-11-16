import { useRouter } from "next/router";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Footer from "../../components/Footer";
import Title from "../../components/pages/game/Title";
import Content from "../../components/pages/game/Content";
import { useEffect, useState } from "react";

export default function Game() {
  const router = useRouter();
  const [ name, setName ] = useState();

  useEffect(() => {
    if (router.isReady) {
      setName(router.query.name.replaceAll("-", " "))
    }
  }, [router])
  
  return (
    <>
      <Header activeKey={0} />
      <SubHeader />
      <Title name={name} />
      <Content name={name} />
      <Footer />
    </>
  );
}