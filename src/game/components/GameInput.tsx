import { Button, createStyles, Group, Text } from "@mantine/core";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import React from "react";

const useStyles = createStyles((theme) => ({
  btcPrice: {
    fontSize: "2rem",
    color: theme.primaryColor,
  },
}));

export const GameInput: React.FC<{ currentPrice: number; timeToAnswer: number }> = ({
  currentPrice,
  timeToAnswer,
}) => {
  const { classes } = useStyles();

  return (
    <>
      <Text>Current BTC Price</Text>
      <Text className={classes.btcPrice}>
        {currentPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </Text>
      <Text>Where do you think the price will go in the next 60 seconds?</Text>
      <Group position="center">
        <Button leftIcon={<TbArrowUp />} color="green">
          Up
        </Button>
        <Button leftIcon={<TbArrowDown />} color="red">
          Down
        </Button>
      </Group>
      <Text>You have {timeToAnswer} seconds left to answer</Text>
    </>
  );
};
