import { Progress } from "antd";

import style from "../../styles.module.scss";
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
  const dayjsDeadline = dayjs.utc(deadline).local();
  const dayjsStartDate =
    startDate !== null
      ? dayjs.utc(startDate).local()
      : dayjs.utc(addedDate).local();
  const dayjsNow = dayjs();
  const diffDeadAndNow = dayjsDeadline.diff(dayjsNow);
  const diffStartAndDead = dayjsDeadline.diff(dayjsStartDate);
  let percent = (diffDeadAndNow / diffStartAndDead) * 100;
  if (percent > 100) percent = 100;
  else if (percent < 0 || isNaN(percent)) percent = 0;
  const pickColor = (percent: number) => {
    if (percent < 30) return "#FC6565";
    else if (percent < 80) return "#FCC865";
    else if (percent > 80) return "#6FCAA9";
  };

  return (
    <>
      <Progress
        strokeColor={pickColor(percent)}
        strokeWidth={4}
        percent={percent}
        showInfo={false}
        className={style.timeLeftProgress}
      />
    </>
  );
};

export default TimeLeftLine;
