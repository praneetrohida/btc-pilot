import {
  ActionIcon,
  Avatar,
  Badge,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  rem,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCurrentUser } from "src/users/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { TbAwardFilled, TbLogout, TbRocket } from "react-icons/tb";
import { useMutation } from "@blitzjs/rpc";
import logout from "src/auth/mutations/logout";
import Link from "next/link";
import { Routes } from "@blitzjs/next";
import gravatarUrl from "gravatar-url";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: rem(56),

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  title: {
    fontSize: "2rem",
  },

  links: {
    width: rem(260),

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  rightGroup: {
    width: rem(260),

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

export function AppHeader() {
  const currentUser = useCurrentUser();
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const { route } = useRouter();

  const [logoutFn] = useMutation(logout);

  return (
    <Header height={56} mb={120}>
      <Container className={classes.inner}>
        <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
        <Group className={classes.links} spacing={5}>
          <Link
            href={Routes.Home()}
            className={cx(classes.link, { [classes.linkActive]: route === "/" })}
          >
            Home
          </Link>
          <Link
            href={Routes.LeaderboardPage()}
            className={cx(classes.link, { [classes.linkActive]: route === "/leaderboard" })}
          >
            Leaderboard
          </Link>
        </Group>

        <Title className={classes.title}>BTC Pilot 🚀</Title>

        <Group spacing={10} className={classes.rightGroup} position="right" noWrap>
          {!currentUser && (
            <Button component={Link} href={Routes.LoginPage()} leftIcon={<TbRocket size={18} />}>
              Play
            </Button>
          )}
          {currentUser && (
            <>
              <Avatar
                radius="xl"
                size={30}
                src={gravatarUrl(currentUser.email, {
                  size: 60,
                  default: `https://source.boringavatars.com/beam/60/${currentUser.name}`,
                })}
              />
              <Badge size="lg">
                <Group spacing={4}>
                  <Text>{currentUser.score} points</Text>
                  <TbAwardFilled size={18} />
                </Group>
              </Badge>
              <Tooltip label="Logout">
                <ActionIcon variant="subtle" size="lg" radius="lg" onClick={() => logoutFn()}>
                  <TbLogout size={20} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
      </Container>
    </Header>
  );
}
