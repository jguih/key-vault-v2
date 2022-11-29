import useGenre from "./useGenre"
import useLanguage from "./useLanguage";

export default function useData() {
  const {genres, isLoading: isLoadingGenres, isError: isErrorGenres} = useGenre();
  const {languages, isLoading: isLoadingLanguages, isError: isErrorLanguages} = useLanguage();

  return {
    data: {
      genres: genres,
      isLoadingGenres: isLoadingGenres,
      isErrorGenres: isErrorGenres,
      languages: languages,
      isLoadingLanguages: isLoadingLanguages,
      isErrorLanguages: isErrorLanguages,
      defined: genres !== undefined && languages !== undefined, 
    } 
  }
}