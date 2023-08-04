import { useRef, useState } from "react";
import { useBoolean } from "react-hanger";
import { rem } from "@mantine/core";

export const useTimeout = ({ onEnd, duration }: { onEnd: () => void; duration: number }) => {
  // return remainingSecs
  const [remainingSecs, setRemainingSecs] = useState(duration);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const isTimeUp = remainingSecs === 0;

  function checkAndDecrementCounter() {
    setRemainingSecs((prevRemainingSecs) => {
      const secsLeft = prevRemainingSecs - 1;
      if (secsLeft === 0) {
        onEnd();
      } else {
        timeoutId.current = setTimeout(checkAndDecrementCounter, 1000);
      }
      return secsLeft;
    });
  }

  const start = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setRemainingSecs(duration);
    timeoutId.current = setTimeout(checkAndDecrementCounter, 1000);
  };

  const stop = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  return [remainingSecs, isTimeUp, start, stop] as const;
};
