import { createStyles, List, Stack, Title } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: theme.fontSizes.lg,
  },
}));

export const Instructions: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Stack>
      <Title className={classes.title}>How to play</Title>
      <List>
        <List.Item>
          Click on <i>Start Game</i>
        </List.Item>{" "}
        <List.Item>You will be shown the current BTC price in USD</List.Item>
        <List.Item>
          Guess if the price will be higher or lower in 60 seconds. You have 5 seconds to make your
          guess.
        </List.Item>
        <List.Item>
          If you guess correctly, you win a point! If you guess incorrectly, you lose a point.
        </List.Item>
      </List>
    </Stack>
  );
};
