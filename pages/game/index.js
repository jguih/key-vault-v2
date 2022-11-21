import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import GameSearchPageBody from '../../components/pages/game/GameSearchPageBody';

export default function GameSearch() {
  // Get initial values for the route
  const router = useRouter();
  const entry = router.query.entry;
  const genres = router.query.genres;

  return (
    <div className="d-flex flex-column justify-content-between h-100 ab">
      <Header activeKey={"/"} />
      <div className="mb-auto pb-4">
        <GameSearchPageBody
        />
      </div>
      <Footer />
    </div>
  );

}