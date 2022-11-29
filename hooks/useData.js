import useGenre from "./useGenre"
import useLanguage from "./useLanguage";
import useGamemode from "./useGamemode";
import usePlatform from "./usePlatform"

export default function useData() {
  const { genres, isLoading: isLoadingGenres, isError: isErrorGenres } = useGenre();
  const { languages, isLoading: isLoadingLanguages, isError: isErrorLanguages } = useLanguage();
  const { gamemodes, isLoading: isLoadingGamemodes, isError: isErrorGamemodes } = useGamemode();
  const { platforms, isLoading: isLoadingPlatforms, isError: isErrorPlatforms } = usePlatform();

  return {
    data: {
      genres: genres,
      isLoadingGenres: isLoadingGenres,
      isErrorGenres: isErrorGenres,
      languages: languages,
      isLoadingLanguages: isLoadingLanguages,
      isErrorLanguages: isErrorLanguages,
      gamemodes: gamemodes,
      isLoadingGamemodes: isLoadingGamemodes,
      isErrorGamemodes: isErrorGamemodes,
      platforms: platforms,
      isLoadingPlatforms: isLoadingPlatforms,
      isErrorPlatforms: isErrorPlatforms,
      defined: genres !== undefined && languages !== undefined && gamemodes !== undefined && platforms !== undefined,
    }
  }
}