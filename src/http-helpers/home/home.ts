import { AllDashboardResponse } from "@/model/home";
import { MovieDetails } from "@/model/movieDetails";
import { Trailer } from "@/model/TrailerPopup";
import axios from "axios";
import { urlContainer } from "../urlContainer";

export const getTrendingMovies = async (
  page: number,
  term?: string
): Promise<AllDashboardResponse | undefined> => {
  if (page && !term) {
    const response = await axios.get(`${urlContainer.dashboard}&page=${page}`);
    return response?.data;
  } else if (page && term !== "") {
    const response = await axios.get(
      `${urlContainer.search}&language=en-US&query=${term}&page=${page}&include_adult=false`
    );
    return response?.data;
  }
};

export const getMoviesDetailsProcess = async (
  id: string | string[] | undefined
): Promise<MovieDetails> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`
  );
  return response?.data;
};

export const getVideosDetailsProcess = async (
  id: string | string[] | undefined
): Promise<Trailer> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`
  );
  return response?.data;
};
