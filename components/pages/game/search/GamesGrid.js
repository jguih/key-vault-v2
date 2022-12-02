import { useEffect, useState } from 'react';
import { createGameCard } from '../../../../global';
import styles from "../../../../scss/modules/pages/game/search/GamesGrid.module.scss"
import { Alert, Dropdown } from "react-bootstrap";
import { Pagination, TopPagination } from '../../../ui/Pagination';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import * as Kv from "../../../ui/Kv";

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
    if (router.isReady && totalPageCount) {
      let pageN = 1;
      if (router.query.page) {
        if (pageN >= 1 && pageN <= totalPageCount) {
          pageN = Number(router.query.page);
        }
      }
      setCurrentPage(pageN);
    }
  }, [router, totalPageCount])

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

  function getGameCard(game, index) {
    return (
      <div className={`${styles["card-wrapper"]}`} key={index}>
        {createGameCard(game)}
      </div>
    );
  }

  if (currentGames.length > 0) {
    return (
      <div className={`${styles.container}`}>
        <div className={`${styles.top} sticky-top pt-3`}>
          <div className={`${styles["top-pagination"]}`}>
            <TopPagination
              currentPage={currentPage}
              totalPageCount={totalPageCount}
              onPageChange={(page) => onPageChange(page)}
            />
          </div>
          <div className={`${styles["top-sort"]}`}>
            <Kv.Dropdown variant="bg-900" title="Ordenar">
              <Dropdown.Item 
                active
              > 
                <p className='m-0'>Preço (Crescente)</p>
              </Dropdown.Item>
              <Dropdown.Item
                
              > 
                <p className='m-0'>Preço (Decrescente)</p>
              </Dropdown.Item>
            </Kv.Dropdown>
          </div>
        </div>  
        <div className={`${styles["games-grid"]}`}>
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
      <div className={`${styles.container} mt-3`}>
        <Alert variant='kv-secondary-800'>Nenhum jogo encontrado :/</Alert>
      </div>
    );
  }
}