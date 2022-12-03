import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GamePageBody from "../../components/pages/game/GamePageBody";

export default function Game() {
  const router = useRouter();
  const name = router.query.name

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