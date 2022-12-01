import { useEffect, useState } from 'react';
import { createGameCard } from '../../../../global';
import usePagination from '../../../../hooks/usePagination';
import gamesGridStyles from "../../../../scss/modules/pages/game/search/GamesGrid.module.scss"
import { Alert, Button } from "react-bootstrap";
import Pagination from '../../../ui/Pagination';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

function getGameCard(game, index) {
  return (
    <div className={`${gamesGridStyles["card-wrapper"]}`} key={index}>
      {createGameCard(game)}
    </div>
  );
}

export default function GamesGrid({ games }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Total n of games per page
  const totalCount = useMemo(() => { // Total n of games
    return games?.length;
  }, [games]);
  const totalPageCount = useMemo(() => { // Total n of pages
    return Math.ceil(totalCount / pageSize);
  }, [totalCount]);
  // Updates current games each time currentPage or games changes
  const currentGames = useMemo(() => {
    const firstGameIndex = (currentPage - 1) * pageSize;
    const lastGameIndex = firstGameIndex + pageSize;
    return games?.slice(firstGameIndex, lastGameIndex);
  }, [currentPage, games]);

  useEffect(() => {
    if (router.isReady) {
      let pageN = 1;
      if (router.query.page) {
        if (pageN >= 1 && pageN <= totalPageCount) {
          pageN = Number(router.query.page);
        }
      }
      setCurrentPage(pageN);
    }
  }, [router])

  if (!games) return;

  function onPageChange(page) {
    const myQuery = {
      ...router.query,
      page: page
    }
    router.push({
      pathname: "/game",
      query: myQuery
    });
  }

  if (currentGames.length > 0) {
    return (
      <div className={`${gamesGridStyles.container}`}>
        <div className={`${gamesGridStyles["games-grid"]}`}>
          {currentGames.map((game, index) => getGameCard(game, index))}
        </div>
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => onPageChange(page)}
        />
      </div>
    );
  } else {
    return (
      <div className={`${gamesGridStyles.container}`}>
        <Alert variant='dark'>Nenhum jogo encontrado :/</Alert>
      </div>
    );
  }
}