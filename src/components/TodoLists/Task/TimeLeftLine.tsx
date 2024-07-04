import { Progress } from "antd";
import type { ProgressProps } from "antd";
import style from "../styles.module.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ITimeLeftLine {
  deadline: string | null;
  startDate: string | null;
  addedDate: string | null;
}
const TimeLeftLine = ({ startDate, deadline, addedDate }: ITimeLeftLine) => {
  const dayjsDeadline = dayjs(deadline);
  const dayjsStartDate =
    startDate !== null ? dayjs(startDate) : dayjs(addedDate);
  const dayjsNow = dayjs();
  const diffDeadAndNow = dayjsDeadline.diff(dayjsNow);
  const diffStartAndDead = dayjsDeadline.diff(dayjsStartDate);
  let percent = (diffDeadAndNow / diffStartAndDead) * 100;
  if (percent < 0) percent = 0;
  if (dayjsStartDate > dayjsNow) percent = 100;
  const pickColor = (percent: number) => {
    if (percent < 30) return "#e32636";
    else if (percent < 80) return "#ffe58f";
    else return "#8db600";
  };

  return (
    <>
      <Progress
        steps={15}
        strokeColor={pickColor(percent)}
        strokeWidth={3}
        percent={percent}
        showInfo={false}
        className={style.timeLeftProgress}
      />
    </>
  );
};

export default TimeLeftLine;
