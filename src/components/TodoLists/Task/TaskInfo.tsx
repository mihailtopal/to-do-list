import style from "../styles.module.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import CountdownTimer from "./CountdownTimer";
import FormattedDate from "../../common/FormattedDate";
import TimeLeftLine from "./TimeLeftLine";
import { useState } from "react";
import { Button } from "primereact/button";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ITaskInfoProps {
  description: string | null;
  deadline: string | null;
  addedDate: string | null;
  startDate: string | null;
  status: number;
  setVisibleEdit: (arg: boolean) => void;
}

const TaskInfo = ({
  description,
  deadline,
  addedDate,
  startDate,
  status,
  setVisibleEdit,
}: ITaskInfoProps) => {
  const NotSet = () => (
    <span className={style.notSetTime}>Time is not set</span>
  );
  const shortDescription =
    description?.length && description?.length > 100
      ? description?.slice(0, 100) + "..."
      : description;
  const [currentDescription, setCurrentDescription] =
    useState(shortDescription);
  const [collapseButtonTitle, setCollapseButtonTitle] =
    useState("Expand description");
  const [isExpand, setIsExpand] = useState(false);
  const [timeToDeadlineMs, setTimeToDeadlineMs] = useState(0);
  const getTimeToDeadline = (time: number) => {
    setTimeToDeadlineMs(time);
  };

  const changeCollapseDescription = () => {
    setIsExpand((prev) => !prev);
    setCurrentDescription(isExpand ? shortDescription : description);
    setCollapseButtonTitle(
      isExpand ? "Expand description" : "Collapse description"
    );
  };
  return (
    <div className={style.dateInfo}>
      <div className={style.dateTop}>
        <div>
          <div>Status </div>

          <div>Added </div>

          <div>Start </div>

          <div>End </div>
        </div>
        <div>
          <div>{status ? "Done" : "In Progress"}</div>
          <div>
            {addedDate === null ? (
              <NotSet />
            ) : (
              <FormattedDate date={addedDate} />
            )}
          </div>
          <div>
            {startDate === null ? (
              <NotSet />
            ) : (
              <FormattedDate date={startDate} />
            )}
          </div>
          <div>
            {deadline === null ? <NotSet /> : <FormattedDate date={deadline} />}
          </div>
        </div>
      </div>
      <div className={style.description}>
        <div>Description</div>
        <div>{currentDescription || "Add a description..."}</div>
        {description?.length && description?.length > 100 && (
          <button onClick={() => changeCollapseDescription()}>
            {collapseButtonTitle}
          </button>
        )}
      </div>

      {deadline === null ? (
        <div>
          <NotSet />
        </div>
      ) : (
        <div>
          {timeToDeadlineMs ? (
            <div className={style.dateBottom}>
              <h3>Due in:</h3>

              <TimeLeftLine
                deadline={deadline}
                startDate={startDate}
                addedDate={addedDate}
              />
              <CountdownTimer
                deadline={deadline}
                getTimeToDeadline={getTimeToDeadline}
              />
            </div>
          ) : (
            <div className={style.dateBottomTimeLeft}>
              <h3>Time left</h3>
              <TimeLeftLine
                deadline={deadline}
                startDate={startDate}
                addedDate={addedDate}
              />
              <CountdownTimer
                deadline={deadline}
                getTimeToDeadline={getTimeToDeadline}
              />
            </div>
          )}
        </div>
      )}
      <Button
        onClick={() => setVisibleEdit(true)}
        className={style.editInfoDialogButton}
      >
        Edit
      </Button>
    </div>
  );
};

export default TaskInfo;
