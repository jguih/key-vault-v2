import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import GameSearchPageBody from '../../components/pages/game/search/GameSearchPageBody';

export default function GameSearch() {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Header activeKey={"/"} />
      <div className="mb-auto">
        <GameSearchPageBody
        />
      </div>
      <Footer />
    </div>
  );
}