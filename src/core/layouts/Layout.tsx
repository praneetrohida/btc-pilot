import Head from "next/head";
import React, { Suspense } from "react";
import { BlitzLayout } from "@blitzjs/next";
import { AppShell, Container, createStyles, Loader } from "@mantine/core";
import { AppHeader } from "src/core/components/Header";

const useStyles = createStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { classes } = useStyles();

  const loader = (
    <Container className={classes.loaderContainer}>
      <Loader size="lg" />
    </Container>
  );

  return (
    <>
      <Head>
        <title>{title || "BTC Pilot 🚀"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={loader}>
        <AppShell header={<AppHeader />}>{children}</AppShell>
      </Suspense>
    </>
  );
};

export default Layout;
export const dynamic = "force-dynamic";
