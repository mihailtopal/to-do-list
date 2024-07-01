import style from "../styles.module.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import CountdownTimer from "./CountdownTimer";
import FormattedDate from "../../common/FormattedDate";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ITaskInfoProps {
  description: string | null;
  deadline: string | null;
  addedDate: string | null;
  startDate: string | null;
}

const TaskInfo = ({
  description,
  deadline,
  addedDate,
  startDate,
}: ITaskInfoProps) => {
  const NotSet = () => <span>not been set yet.</span>;
  return (
    <div>
      <h3>
        Description: <span>{description ? "" : <NotSet />}</span>
      </h3>
      {description || ""}
      {deadline === null ? (
        <h3>The deadline has not been set yet.</h3>
      ) : (
        <>
          <h3>The deadline is in: </h3>
          <CountdownTimer deadline={deadline} />
        </>
      )}
      <div className={style.dateInfo}>
        <div>
          <span>Added:{"  "}</span>
          {addedDate === null ? <NotSet /> : <FormattedDate date={addedDate} />}
        </div>
        <div>
          <span>Start:{"  "}</span>
          {startDate === null ? <NotSet /> : <FormattedDate date={startDate} />}
        </div>
        <div>
          <span>End:{"  "}</span>
          {deadline === null ? <NotSet /> : <FormattedDate date={deadline} />}
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
