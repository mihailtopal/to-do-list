import style from "../../styles.module.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";

dayjs.extend(duration);

dayjs.extend(relativeTime);

interface ITimerProps {
  deadline: string | null;
}

const Timer = ({ deadline }: ITimerProps) => {
  const dayjsDate1 = dayjs.utc(deadline).local();
  const [now, setNow] = useState<dayjs.Dayjs>();
  let differenceInMilliseconds = dayjsDate1.diff(now);
  if (differenceInMilliseconds < 0) differenceInMilliseconds = 0;
  const differenceDuration = dayjs.duration(differenceInMilliseconds);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  let timeItem;
  if (differenceDuration.days() > 0)
    timeItem = Math.floor(differenceDuration.asDays()) + " days";
  else if (differenceDuration.hours() > 0)
    timeItem = differenceDuration.hours() + " hours";
  else if (differenceDuration.minutes() > 0)
    timeItem = differenceDuration.minutes() + " minutes";
  return (
    <div
      className={classNames(style.miniTimer, {
        [style.timeLeft]: deadline && !timeItem,
      })}
    >
      <div>
        <span className={classNames("pi", "pi-clock", style.clockItem)}></span>
      </div>

      {deadline
        ? timeItem
          ? `Due in ${timeItem}`
          : "Time left"
        : "Time is not set"}
    </div>
  );
};

export default Timer;
