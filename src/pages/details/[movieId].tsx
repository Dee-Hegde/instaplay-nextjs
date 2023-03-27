import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Rate, Spin } from "antd";

import arrow from "@/assets/ArrowLeft.svg";
import play from "@/assets/play.svg";

import { TrailerData } from "@/model/TrailerPopup";
import {
  getMoviesDetailsProcess,
  getVideosDetailsProcess,
} from "@/http-helpers/home/home";
import Popup from "@/components/movieCard/Popup";
import { MovieDetails, SpokenLanguage } from "@/model/movieDetails";

const CustomLoader = ({
  src,
  width,
  quality,
}: {
  src?: string;
  width?: number;
  quality?: number;
}) => {
  return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
};

const Details = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>();
  const [videoDetails, setVideoDetails] = useState<TrailerData | undefined>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== "true") {
      router.push("/");
    }
    if (movieId) {
      getMovieDetails();
      getVideoDetails();
      setIsLoading(false);
    }
  }, [movieId]);
  const getMovieDetails = async (): Promise<void> => {
    const temp = await getMoviesDetailsProcess(movieId);
    setMovieDetails(temp);
  };

  const getVideoDetails = async (): Promise<void> => {
    const temp = await getVideosDetailsProcess(movieId);
    const trailer_temp = temp.results.filter(
      (item: TrailerData) => item.type === "Trailer"
    );
    setVideoDetails(trailer_temp[0]);
    setIsLoading(false);
  };

  return (!isLoading && movieDetails) ? (
    <div className="md-container">
      <div className="md-image-container">
        <div className="mobile">
          <Image
            onClick={() => router.push("/dashboard")}
            src={arrow}
            alt=""
            className="arrow mobile"
          />
        </div>
        <div className="position-relative">
          <Image
            loader={() =>
              CustomLoader({ src: movieDetails?.backdrop_path, width: 100 })
            }
            src={movieDetails?.backdrop_path}
            alt=""
            width={700}
            height={700}
            className={"backgoundimg"}
          />
          <Image
            onClick={() => setVisible(true)}
            src={play}
            alt=""
            className="player"
          />
        </div>
      </div>
      <div className="md-details-container">
        <Image
          onClick={() => router.push("/dashboard")}
          src={arrow}
          alt=""
          className="arrow desktop"
        />
        <h3>{movieDetails?.title}</h3>
        <p>{movieDetails?.tagline}</p>
        <p className="ratings">
          Ratings: {(movieDetails?.vote_average / 2).toFixed(2)} / 5{" "}
        </p>
        <Rate
          allowHalf
          count={5}
          value={movieDetails?.vote_average / 2}
          disabled={true}
        />
        <p className="description">{movieDetails?.overview}</p>
        <p className="ratings">
          Release Date: <span>{movieDetails?.release_date}</span>
        </p>
        <p className="ratings">
          Orginal Language:{" "}
          {movieDetails?.spoken_languages?.map(
            (item: SpokenLanguage, index: number) =>
              index === movieDetails.spoken_languages.length - 1 ? (
                <span key={index}>{item?.name}</span>
              ) : (
                <span key={index}>
                  {item?.name}
                  {", "}
                </span>
              )
          )}
        </p>
      </div>
      <Popup
        visible={visible}
        videoDetails={videoDetails}
        setVisible={setVisible}
      />
    </div>) : (
    <div>
      <Spin size="large" tip="Please wait... "></Spin>
    </div>);
};
export default Details;