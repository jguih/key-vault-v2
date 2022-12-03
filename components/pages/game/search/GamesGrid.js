import { useEffect, useState } from 'react';
import { createGameCard } from '../../../../global';
import styles from "../../../../scss/modules/pages/game/search/GamesGrid.module.scss"
import { Alert, Dropdown } from "react-bootstrap";
import { Pagination, TopPagination } from '../../../ui/Pagination';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import * as Kv from "../../../ui/Kv";

const sortBy = {
  priceAsc: "priceAsc",
  priceDesc: "priceDesc",
  nameAsc: "nameAsc",
  nameDesc: "nameDesc"
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
  const [shouldActive, setShouldActive] = useState("")

  useEffect(() => {
    if (router.isReady) {
      if (totalPageCount) {
        let pageN = 1;
        if (router.query.page) {
          if (pageN >= 1 && pageN <= totalPageCount) {
            pageN = Number(router.query.page);
          }
        }
        setCurrentPage(pageN);
      }

      if (router.query.sort) {
        const sort = router.query.sort;
        setShouldActive(sort);
      }
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

  function getSortName (sort) {
    switch (sort) {
      case sortBy.nameAsc: 
        return "Nome (Crescente)";
      case sortBy.nameDesc:
        return "Nome (Decrescente)";
      case sortBy.priceAsc:
        return "Preço (Crescente)";
      case sortBy.priceDesc:
        return "Preço (Decrescente)";
      default:
        return "Selecionar";
    }
  }

  const sort = {
    priceAsc: function () {
      const myQuery = {...router.query, page: 1};
      myQuery.sort = sortBy.priceAsc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    priceDesc: function () {
      const myQuery = {...router.query, page: 1};
      myQuery.sort = sortBy.priceDesc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    nameAsc: function () {
      const myQuery = {...router.query, page: 1};
      myQuery.sort = sortBy.nameAsc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    nameDesc: function () {
      const myQuery = {...router.query, page: 1};
      myQuery.sort = sortBy.nameDesc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    }
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
            <p>Ordenar: </p>
            <Kv.Dropdown variant="bg-900" title={getSortName(shouldActive)}>
              <Dropdown.Item 
                onClick={() => sort.priceAsc()}
                active={shouldActive === sortBy.priceAsc}
              > 
                <p className='m-0'>Preço (Crescente)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.priceDesc()}
                active={shouldActive === sortBy.priceDesc}
              > 
                <p className='m-0'>Preço (Decrescente)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.nameAsc()}
                active={shouldActive === sortBy.nameAsc}
              > 
                <p className='m-0'>Nome (Crescente)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.nameDesc()}
                active={shouldActive === sortBy.nameDesc}
              > 
                <p className='m-0'>Nome (Decrescente)</p>
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