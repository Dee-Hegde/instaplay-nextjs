import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { Rate } from "antd";

import { MovieCardDetails } from "@/model/home";
import play from "@/assets/play.png";

const MovieCard = ({ details }: MovieCardDetails) => {
  const router = useRouter();
  const CustomLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <div
      className="card-container"
      onClick={() => router.push(`/details/${details.id}`)}
    >
      <div className="img-container">
        <Image
          loader={() => CustomLoader({ src: details?.poster_path, width: 280 })}
          src={`${details?.poster_path}`}
          alt=""
          width={280}
          height={280}
          style={{ objectFit: "cover", objectPosition: "0% 0%" }}
        />
      </div>
      <div className="details-Container">
        <div className="dc-1">
          <h3>{details?.title}</h3>
          <Rate
            style={{ marginRight: "10px" }}
            allowHalf
            count={5}
            value={details.vote_average / 2}
            disabled={true}
          />
          <span>{(details.vote_average / 2).toFixed(2)} / 5</span>
        </div>
        <div className="dc2">
          <Image className="play" src={play} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
