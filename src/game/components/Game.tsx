import React from "react";
import { Alert, Button, createStyles, Loader, Stack, Text } from "@mantine/core";
import { Instructions } from "src/game/components/Instructions";
import { useBoolean } from "react-hanger";
import { useQuery } from "@blitzjs/rpc";
import getBtcPrice from "src/game/queries/getBtcPrice";
import { useTimeout } from "src/game/hooks/useTimeout";
import { GameInput } from "src/game/components/GameInput";
import getCurrentPrediction from "src/game/queries/getCurrentPrediction";

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

  const hasStartedGame = useBoolean(false);

  const [timeToAnswer, noTimeLeftToAnswer, startTimeoutToAnswer, stopTimeoutToAnswer] = useTimeout({
    duration: 5,
    onEnd: hasStartedGame.setFalse,
  });

  const [btcPrice, { isLoading, error, refetch }] = useQuery(getBtcPrice, null, {
    enabled: hasStartedGame.value,
    suspense: false,
    onError: hasStartedGame.setFalse,
    cacheTime: 0,
  });

  const startGame = async () => {
    hasStartedGame.setTrue();
    startTimeoutToAnswer();
    await refetch();
  };

  const [currentPrediction] = useQuery(getCurrentPrediction, null);

  return (
    <Stack spacing={40}>
      <Instructions />

      <Stack align="center" justify="center" className={classes.gameContainer}>
        {!currentPrediction && (
          <>
            {!hasStartedGame.value && (
              <>
                {noTimeLeftToAnswer && <Text>Unfortunately, you ran out of time. Try again</Text>}
                <Button onClick={startGame}>Start a new game</Button>
              </>
            )}
            {error && (
              <Alert color="red">An error occured when starting the game. Please try again</Alert>
            )}

            {hasStartedGame.value && (
              <Stack sx={{ textAlign: "center" }}>
                {isLoading && <Loader />}
                {!isLoading && btcPrice && (
                  <GameInput currentPrice={btcPrice} timeToAnswer={timeToAnswer} />
                )}
              </Stack>
            )}
          </>
        )}
        {currentPrediction && <Text>Prediction </Text>}
      </Stack>
    </Stack>
  );
};
