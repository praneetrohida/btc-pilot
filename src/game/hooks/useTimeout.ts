import { useEffect, useRef, useState } from "react";

export const useTimeout = ({
  onEnd,
  duration,
  autoStart,
}: {
  onEnd: () => void;
  duration: number;
  autoStart?: boolean;
}) => {
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
    if (duration === 0) return onEnd();
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

  useEffect(() => {
    if (autoStart) start();
  }, []);

  return [remainingSecs, isTimeUp, start, stop] as const;
};
