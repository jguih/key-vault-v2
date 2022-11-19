import { Container, Button, Badge, Alert } from "react-bootstrap";
import section from "../scss/modules/Section.module.scss";
import GameCard from "./GameCard";
import Link from "next/link";
import useGame from "../hooks/useGame";
import { createGameCard } from "../global";

function getClass(index) {
  if (index >= 4) {
    // Marks every item after the 4th with a class 'removed'
    // This limits the section to 4 items when screen is too small
    return section.item + " " + section["sentinel"];
  } else {
    return section.item;
  }
}

function getGameCards(game, index, rows) {
  if (index < rows * 5) {
    return (
      <div
        className={getClass(index)}
        key={index}
      >
        {createGameCard(game)}
      </div>
    );
  }
}

export default function Section({ title, rows }) {
  const { games, isLoading, isError } = useGame();

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
      <Container className="mt-4">
        <div className={section.container}>
          <div className={section.top}>
            <h3>{title}</h3>
            <Button variant="kv-primary-800" className="border">
              <strong>VER MAIS</strong>
            </Button>
          </div>
          <hr />
          <div className={section.content}>
            {games.map((game, index) => getGameCards(game, index, rows))}
          </div>
        </div>
      </Container>
    );
  }
}