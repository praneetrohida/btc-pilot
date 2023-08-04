import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Container, createStyles, Stack, Title, Text, Button } from "@mantine/core"
import { TbRocket } from "react-icons/tb"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Game } from "src/game/components/Game"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
  hero: {
    minHeight: "80vh",
  },
  title: {
    fontSize: "4rem",
  },
  description: {
    fontWeight: "bold",
    color: theme.colors.gray[6],
  },
}))

const Home: BlitzPage = () => {
  const { classes } = useStyles()
  const user = useCurrentUser()

  return (
    <Layout>
      <Container>
        {!user && (
          <Stack className={classes.hero} justify="center" align="start">
            <Title className={classes.title}>Are you the Wolf of the Cologne Street?</Title>
            <Text className={classes.description}>
              Show-off your inner 6th sense by sensing and forecasting the price of BTC
            </Text>
            <Button
              leftIcon={<TbRocket size={22} />}
              size="xl"
              component={Link}
              href={Routes.LoginPage()}
            >
              Play
            </Button>
          </Stack>
        )}

        {user && <Game />}
      </Container>
    </Layout>
  )
}

export default Home
