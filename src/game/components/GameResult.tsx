import { createStyles, Text } from "@mantine/core";
import React, { useRef } from "react";
import getCurrentPrediction from "src/game/queries/getCurrentPrediction";
import { PromiseReturnType } from "blitz";
import { useTimeout } from "src/game/hooks/useTimeout";
import { invalidateQuery } from "@blitzjs/rpc";

const useStyles = createStyles((theme) => ({
  timeLeft: { fontSize: "5rem", fontWeight: 900, color: theme.primaryColor },
}));

export const GameResult: React.FC<{
  prediction: PromiseReturnType<typeof getCurrentPrediction>;
}> = ({ prediction }) => {
  const { classes } = useStyles();
  const timeToResult = useRef(60 - (Date.now() - prediction!.createdAt.getTime()) / 1000);

  const onTimeout = async () => {
    await invalidateQuery(getCurrentPrediction);
  };

  const [timeLeft] = useTimeout({
    duration: Math.round(timeToResult.current),
    onEnd: onTimeout,
    autoStart: true,
  });

  return (
    <>
      <Text className={classes.timeLeft}>{timeLeft}</Text>
      <Text>seconds left for your result.</Text>
      <Text>This is a great time to meditate and practice some mindfulness.</Text>
    </>
  );
};
