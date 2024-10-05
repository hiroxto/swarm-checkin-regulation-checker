import { useCurrentTime } from "~/hooks/useCurrentTime";
import { date2String } from "~/lib/functions";

const CurrentTime = () => {
  const { currentTime } = useCurrentTime();

  return <p className="pt-2">現在時刻: {date2String(currentTime)}</p>;
};

export default CurrentTime;
