import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import GamesGrid from '../../components/pages/search/GamesGrid';
import SubHeader from '../../components/SubHeader';
import useGameByNameContains from '../../hooks/useGameByNameContains';

export default function Search() {
  const router = useRouter();
  const [entry, setEntry] = useState();
  const { games, isLoading, isError } = useGameByNameContains(entry);

  useEffect(() => {
    if (router.isReady) {
      setEntry(router.query.entry);
    }
  }, [router])

  if (games) {
    return (
      <div className="d-flex flex-column justify-content-between h-100 ab">
        <Header activeKey={"/"} />
        <div className="mb-auto pb-4 pt-4">
          <Container>
            <GamesGrid 
              games={games}
            />
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}