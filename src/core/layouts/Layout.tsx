import Head from "next/head";
import React, { Suspense } from "react";
import { BlitzLayout } from "@blitzjs/next";
import { AppShell } from "@mantine/core";
import { AppHeader } from "src/core/components/Header";

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "BTC Pilot 🚀"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback="Loading...">
        <AppShell header={<AppHeader />}>{children}</AppShell>
      </Suspense>
    </>
  );
};

export default Layout;
export const dynamic = "force-dynamic";
