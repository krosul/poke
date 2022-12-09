import { FC } from "react";

import React from "react";
import Head from "next/head";

import { Navbar } from "../ui";
interface props {
  children?: React.ReactNode;
  title?: string;
}

const origin=(typeof window==="undefined"?"":window.location.origin)

export const MainLayout: FC<props> = ({ children, title }) => {


  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Juan Pablo Rodriguez" />
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title},pokemon,pokedex`} />
        <meta
          property="og:title"
          content={`
          information about pokemon ${title}`}
        />
        <meta
          property="og:description"
          content={`this is the page about ${title}`}
        />
        <meta
          property="og:image"
          content={`${origin}/img/banner.png`}
        />
      </Head>
      <Navbar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
