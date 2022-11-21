import { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';
import useGame from '../hooks/useGame';

export default function Home() {
  const { games, isLoading, isError } = useGame();
  const [outdoorGames, setOutdoorGames] = useState();
  const [section1Games, setSection1Games] = useState();
  const [section2Games, setSection2Games] = useState();

  useEffect(() => {
    if (games) {
      setOutdoorGames(games.slice(0, 4));
      setSection1Games(games.slice(0, 5));
      setSection2Games(games.slice(5, 10));
    }
  }, [games])

  if (isLoading) {
    return (
      <Container>
        <Alert variant="success">Loading...</Alert>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Alert variant="danger">Failed to load</Alert>
      </Container>
    );
  }

  if (games) {
    return (
      <div className="d-flex flex-column justify-content-between h-100 ab">
        <Header activeKey={"/"} />
        <div className="mb-auto pb-4 pt-4">
          <SubHeader />
          <Outdoor games={outdoorGames} gamesLength={4}/>
          <Section
            title="Adicionados Recentemente"
            games={section1Games}
          />
          <Section
            title="Promoção"
            games={section2Games}
          />
        </div>
        <Footer />
      </div>
    );
  }
}