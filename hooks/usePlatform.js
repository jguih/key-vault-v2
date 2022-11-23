import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function usePlatform() {
  const { data, error } = useSWR('http://localhost:3000/platforms.json', fetcher);

  return {
    genres: data,
    isLoading: !error && !data,
    isError: error
  }
}