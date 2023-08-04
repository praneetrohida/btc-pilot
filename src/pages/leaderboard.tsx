import Layout from "../core/layouts/Layout";
import { Container, Loader, Title } from "@mantine/core";
import { Suspense } from "react";
import { Leaderboard } from "src/game/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <Layout title="Leaderboard">
      <Container>
        <Title>Leaderboard</Title>
        <Suspense fallback={<Loader />}>
          <Leaderboard />
        </Suspense>
      </Container>
    </Layout>
  );
};

export default LeaderboardPage;
