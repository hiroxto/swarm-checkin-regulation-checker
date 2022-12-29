import {date2String} from "../lib/functions";
import {useEffect, useState} from "react";
import {useTime} from "../hooks/times";

interface Props {
  interval: number
}

const NowDate  = (props: Props) => {
  const {time} = useTime({interval: props.interval});
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return (
    <p className="pt-2">
      現在時刻: {isClient ? date2String(new Date(time)) : 'date is not available'}
    </p>
  )
}

export default NowDate
