import Head from 'next/head'
import { Inter } from 'next/font/google'
import Metrics from "./metrics";

import React, { FC, ReactNode } from "react";


type Props = {
  title?: string;
  children: ReactNode;
};

function layoutTitle(title: string | undefined): string {
  const base = "kayshev.com";
  return title ? title : base;
}

const Layout: FC<Props> = ({ title, children }) => (
    <>
      <Head>
        <title>{layoutTitle(title)}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon-32x32.png" />
        <Metrics />
      </Head>
      {children}
    </>
)

export default Layout
