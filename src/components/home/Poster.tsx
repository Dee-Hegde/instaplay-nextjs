import React from "react";
import poster from "@/assets/poster.png";
import Image from "next/image";

function Poster() {
  return (
    <div className="poster-container">
      <Image src={poster} alt="" />
    </div>
  );
}

export default Poster;
