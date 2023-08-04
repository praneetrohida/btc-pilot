import { Button, createStyles, Group, Text } from "@mantine/core";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import React from "react";
import pluralize from "pluralize";
import { invalidateQuery, useMutation } from "@blitzjs/rpc";
import createPredictionMutation from "../mutations/createPrediction";
import { PredictionDirection } from "db";
import getCurrentPrediction from "src/game/queries/getCurrentPrediction";
import { formatCurrency } from "../utils/formatCurrency";

const useStyles = createStyles((theme) => ({
  btcPrice: {
    fontSize: "2rem",
    color: theme.primaryColor,
  },
}));

export const GameInput: React.FC<{
  currentPrice: number;
  timeToAnswer: number;
  onSelect: () => void;
}> = ({ currentPrice, timeToAnswer, onSelect }) => {
  const { classes } = useStyles();

  const [createPrediction, { isLoading: isSubmitting }] = useMutation(createPredictionMutation);

  const onCreate = async (direction: PredictionDirection) => {
    await createPrediction({ direction, price: currentPrice });
    await invalidateQuery(getCurrentPrediction);
    onSelect();
  };

  return (
    <>
      <Text>Current BTC Price</Text>
      <Text className={classes.btcPrice}>{formatCurrency(currentPrice)}</Text>
      <Text>Where do you think the price will go in the next 60 seconds?</Text>
      <Group position="center">
        <Button
          leftIcon={<TbArrowUp />}
          color="green"
          onClick={() => onCreate(PredictionDirection.UP)}
        >
          Up
        </Button>
        <Button
          leftIcon={<TbArrowDown />}
          color="red"
          onClick={() => onCreate(PredictionDirection.DOWN)}
        >
          Down
        </Button>
      </Group>
      {isSubmitting && <Text>Submitting...</Text>}
      <Text>
        You have {timeToAnswer} {pluralize("second", timeToAnswer)} left to answer
      </Text>
    </>
  );
};
