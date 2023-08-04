import React, { useEffect } from "react";
import { Alert, Button, createStyles, Loader, Stack, Text } from "@mantine/core";
import { Instructions } from "src/game/components/Instructions";
import { useBoolean } from "react-hanger";
import { useQuery } from "@blitzjs/rpc";
import getBtcPrice from "src/game/queries/getBtcPrice";
import { useTimeout } from "src/game/hooks/useTimeout";
import { GameInput } from "src/game/components/GameInput";
import getCurrentPrediction from "src/game/queries/getCurrentPrediction";
import { GameResult } from "src/game/components/GameResult";

const useStyles = createStyles((theme) => ({
  gameContainer: {
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.gray[8]}`,
    width: "100%",
    minHeight: 200,
  },
}));

export const Game: React.FC = () => {
  const { classes } = useStyles();

  const gameInProgress = useBoolean(false);

  const [timeToAnswer, noTimeLeftToAnswer, startTimeoutToAnswer, stopTimeoutToAnswer] = useTimeout({
    duration: 5,
    onEnd: gameInProgress.setFalse,
  });

  const [btcPrice, { isLoading, error, refetch }] = useQuery(getBtcPrice, null, {
    enabled: gameInProgress.value,
    suspense: false,
    onError: gameInProgress.setFalse,
    cacheTime: 0,
  });

  const startGame = async () => {
    gameInProgress.setTrue();
    startTimeoutToAnswer();
    await refetch();
  };

  const onSelect = () => {
    stopTimeoutToAnswer();
    gameInProgress.setFalse();
  };

  const [predictionPollingInterval, setPredictionPollingInterval] = React.useState(0);

  const [currentPrediction] = useQuery(getCurrentPrediction, null, {
    refetchInterval: predictionPollingInterval,
  });

  useEffect(() => {
    if (currentPrediction?.isPending) {
      setPredictionPollingInterval(2000);
    } else {
      setPredictionPollingInterval(0);
    }
  }, [currentPrediction?.isPending]);

  let shouldShowGameResult = !gameInProgress.value && currentPrediction && !noTimeLeftToAnswer;
  let shouldShowStartButton = !gameInProgress.value && !currentPrediction?.isPending;
  return (
    <Stack spacing={40}>
      <Instructions />

      <Stack align="center" justify="center" className={classes.gameContainer}>
        <>
          {shouldShowGameResult && <GameResult prediction={currentPrediction} />}
          {shouldShowStartButton && (
            <>
              {noTimeLeftToAnswer && <Text>Unfortunately, you ran out of time. Try again</Text>}
              <Button onClick={startGame}>Start a new game</Button>
            </>
          )}

          {error && (
            <Alert color="red">An error occured when starting the game. Please try again</Alert>
          )}

          {gameInProgress.value && (
            <Stack sx={{ textAlign: "center" }}>
              {isLoading && <Loader />}
              {!isLoading && btcPrice && (
                <GameInput
                  onSelect={onSelect}
                  currentPrice={btcPrice}
                  timeToAnswer={timeToAnswer}
                />
              )}
            </Stack>
          )}
        </>
      </Stack>
    </Stack>
  );
};
