import { FC } from "react";

import React from "react";
import Head from "next/head";

import { Navbar } from "../ui";
interface props {
  children?: React.ReactNode;
  title?: string;
}

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
      </Head>
      <Navbar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
