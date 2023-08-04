import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import { SignupForm } from "src/auth/components/SignupForm";
import { BlitzPage, Routes } from "@blitzjs/next";
import { Container } from "@mantine/core";

const SignupPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Layout title="Sign Up">
      <Container size="sm">
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </Container>
    </Layout>
  );
};

export default SignupPage;
