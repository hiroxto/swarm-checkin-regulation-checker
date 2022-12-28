import { useEffect, useState } from 'react'

interface HookArgs {
  interval: number
}

export const useTime = ({interval}: HookArgs) => {
  const [time, setTime] = useState<number>(Date.now());

  useEffect(() => {
    const timeoutId = setTimeout(() => setTime(Date.now()), interval);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [time, setTime, interval]);

  return {time};
}
