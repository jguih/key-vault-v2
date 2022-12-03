import { useEffect, useState } from 'react';

export default function useIGDBInvolvedCompanies(id) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("http://localhost:3000/api/igdb/involved_companies/"+id, {
            method: "POST",
            header: new Headers({
              'Accept': 'application/json'
            }),
          });
          const data = await response.json();

          setData(data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [id])

  return {
    data,
    error,
    isLoading
  }
}

