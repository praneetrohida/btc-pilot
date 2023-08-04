import { createStyles, Text } from "@mantine/core";
import React, { useRef } from "react";
import getCurrentPrediction from "src/game/queries/getCurrentPrediction";
import { PromiseReturnType } from "blitz";
import { useTimeout } from "src/game/hooks/useTimeout";
import { invalidateQuery } from "@blitzjs/rpc";
import { PredictionResult } from "db";
import { formatCurrency } from "../utils/formatCurrency";

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

  const [timeLeft, isTimedOut] = useTimeout({
    duration: Math.max(0, Math.round(timeToResult.current)),
    onEnd: onTimeout,
    autoStart: true,
  });

  return (
    <>
      {!isTimedOut && (
        <>
          <Text className={classes.timeLeft}>{timeLeft}</Text>
          <Text>seconds left for your result.</Text>
          <Text>This is a great time to meditate and practice some mindfulness.</Text>{" "}
        </>
      )}
      {isTimedOut && (
        <>
          {prediction?.laterPrice && (
            <>
              {prediction.result === PredictionResult.WIN && <Text> You won! 🎉 </Text>}
              {prediction.result === PredictionResult.LOSS && <Text> You lost! 😔 </Text>}
              {prediction.result === PredictionResult.DRAW && (
                <Text> Uh oh! The price stayed the same. Try again? </Text>
              )}
              You predicted that the price would go {prediction.direction.toLowerCase()}. <br />
              The price went from {formatCurrency(prediction.price)} to{" "}
              {formatCurrency(prediction.laterPrice)}
            </>
          )}
        </>
      )}
    </>
  );
};
