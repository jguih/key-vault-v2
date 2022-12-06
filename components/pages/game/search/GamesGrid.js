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
  nameDesc: "nameDesc",
  releaseDateAsc: "releaseDateAsc",
  releaseDateDesc: "releaseDateDesc"
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
        if (router.query?.page >= 1 && router.query?.page <= totalPageCount) {
          const pageN = Number(router.query.page);
          setCurrentPage(pageN);
        } else if (router.query.page) {
          router.push({
            pathname: "/game",
            query: {
              ...router.query,
              page: 1
            }
          })
        }
      }

      if (router.query.sort) {
        const sort = router.query.sort;
        setShouldActive(sort.toLowerCase());
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

  function getSortName(sort) {
    switch (sort) {
      case sortBy.nameAsc.toLowerCase():
        return "Nome (A-Z)";
      case sortBy.nameDesc.toLowerCase():
        return "Nome (Z-A)";
      case sortBy.priceAsc.toLowerCase():
        return "Preço (do mais barato)";
      case sortBy.priceDesc.toLowerCase():
        return "Preço (do mais caro)";
      case sortBy.releaseDateAsc.toLowerCase():
        return "Data de Lançamento (do mais antigo)";
      case sortBy.releaseDateDesc.toLowerCase():
        return "Data de Lançamento (do mais recente)";
      default:
        return "Selecionar";
    }
  }

  const sort = {
    priceAsc: function () {
      const myQuery = { ...router.query, page: 1 };
      myQuery.sort = sortBy.priceAsc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    priceDesc: function () {
      const myQuery = { ...router.query, page: 1 };
      myQuery.sort = sortBy.priceDesc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    nameAsc: function () {
      const myQuery = { ...router.query, page: 1 };
      myQuery.sort = sortBy.nameAsc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    nameDesc: function () {
      const myQuery = { ...router.query, page: 1 };
      myQuery.sort = sortBy.nameDesc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    releaseDateAsc: function () {
      const myQuery = { ...router.query, page: 1 };
      myQuery.sort = sortBy.releaseDateAsc;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    releaseDateDesc: function () {
      const myQuery = { ...router.query, page: 1 };
      myQuery.sort = sortBy.releaseDateDesc;
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
                active={shouldActive === sortBy.priceAsc.toLowerCase()}
              >
                <p className='m-0'>Preço (do mais barato)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.priceDesc()}
                active={shouldActive === sortBy.priceDesc.toLowerCase()}
              >
                <p className='m-0'>Preço (do mais caro)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.nameAsc()}
                active={shouldActive === sortBy.nameAsc.toLowerCase()}
              >
                <p className='m-0'>Nome (A-Z)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.nameDesc()}
                active={shouldActive === sortBy.nameDesc.toLowerCase()}
              >
                <p className='m-0'>Nome (Z-A)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.releaseDateAsc()}
                active={shouldActive === sortBy.releaseDateAsc.toLowerCase()}
              >
                <p className='m-0'>Data de Lançamento (do mais antigo)</p>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => sort.releaseDateDesc()}
                active={shouldActive === sortBy.releaseDateDesc.toLowerCase()}
              >
                <p className='m-0'>Data de Lançamento (do mais recente)</p>
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