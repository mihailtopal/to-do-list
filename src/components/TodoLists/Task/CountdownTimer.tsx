import style from "../styles.module.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ICountdownTimerProps {
  deadline: string | null;
  getTimeToDeadline?: (time: number) => void;
}

const CountdownTimer = ({
  deadline,
  getTimeToDeadline,
}: ICountdownTimerProps) => {
  const dayjsDate1 = dayjs.utc(deadline).local();
  const [now, setNow] = useState<dayjs.Dayjs>();
  let differenceInMilliseconds = dayjsDate1.diff(now);
  if (differenceInMilliseconds < 0) differenceInMilliseconds = 0;
  const differenceDuration = dayjs.duration(differenceInMilliseconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
      if (getTimeToDeadline) getTimeToDeadline(differenceInMilliseconds);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const formattedDay = differenceDuration.days();
  const formattedHour = differenceDuration.format("HH"); // Часы с ведущим нулем
  const formattedMinute = differenceDuration.format("mm"); // Минуты с ведущим нулем
  const formattedSecond = differenceDuration.format("ss"); // Секунды с ведущим нулем
  return (
    <div className={style.dateTablo}>
      <div className={style.date}>
        {differenceDuration.days() === 0 ? (
          ""
        ) : (
          <>
            <div>
              <div>{formattedDay}</div>
              <div>Days</div>
            </div>
            <span>:</span>
          </>
        )}

        <div>
          <div>{formattedHour}</div>
          <div>Hours</div>
        </div>
        <span>:</span>
        <div>
          <div>{formattedMinute}</div>
          <div>Minutes</div>
        </div>
        <span>:</span>
        <div>
          <div>{formattedSecond}</div>
          <div>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
