import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useGame() {
  const { data, error } = useSWR('http://localhost:3000/games.json', fetcher);

  return {
    games: data,
    isLoading: !error && !data,
    isError: error,
    names: data?.map(d => d.name.toLowerCase())
  }
}