import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Context from "@/context/DashBoardContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Navbar />
      <Component {...pageProps} />
    </Context>
  );
}