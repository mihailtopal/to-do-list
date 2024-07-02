import style from "../styles.module.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ICountdownTimerProps {
  deadline: string | null;
}

const CountdownTimer = ({ deadline }: ICountdownTimerProps) => {
  const dayjsDate1 = dayjs(deadline);
  const [now, setNow] = useState<dayjs.Dayjs>();
  const differenceInMilliseconds = dayjsDate1.diff(now);
  const differenceDuration = dayjs.duration(differenceInMilliseconds);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={style.dateTablo}>
      <div className={style.date}>
        {differenceDuration.days() === 0 ? (
          ""
        ) : (
          <>
            <div>
              <div>{differenceDuration.days()}</div>
              <div>Days</div>
            </div>
            <span>:</span>
          </>
        )}

        <div>
          <div>{differenceDuration.hours()}</div>
          <div>Hours</div>
        </div>
        <span>:</span>
        <div>
          <div>{differenceDuration.minutes()}</div>
          <div>Minutes</div>
        </div>
        <span>:</span>
        <div>
          <div>{differenceDuration.seconds()}</div>
          <div>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
