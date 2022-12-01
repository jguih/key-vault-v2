import useGame from "../../hooks/useGame";

export default function Json() {
  const {games, isLoading, isError} = useGame();

  return (
    <pre>
      <p>
        {JSON.stringify(games, null, 2)}
      </p>
    </pre>
  );
}