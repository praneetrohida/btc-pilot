import { useRef } from "react";
import { GAME_TIME } from "src/game/config";

export const useTimeToResult = (date: Date) => {
  const nowISO = new Date().toISOString();
  const dateISO = date.toISOString();

  const diff = new Date(nowISO).getTime() - new Date(dateISO).getTime();

  const timeToResult = useRef(GAME_TIME - diff / 1000);
  return timeToResult.current;
};
