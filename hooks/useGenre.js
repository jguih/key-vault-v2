import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useGenre() {
  const { data, error } = useSWR('http://localhost:3000/genres.json', fetcher);

  return {
    genres: data,
    isLoading: !error && !data,
    isError: error
  }
}