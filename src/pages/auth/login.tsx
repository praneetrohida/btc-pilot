import { BlitzPage } from "@blitzjs/next";
import Layout from "src/core/layouts/Layout";
import { LoginForm } from "src/auth/components/LoginForm";
import { useRouter } from "next/router";
import { Container, Stack } from "@mantine/core";

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Layout title="Log In">
      <Container size="sm">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/";
            return router.push(next);
          }}
        />
      </Container>
    </Layout>
  );
};

export default LoginPage;
