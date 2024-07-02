import { Checkbox } from "primereact/checkbox";
import { ITaskItem, IUpdateTask } from "../../../api/todoAPI";
import { useState } from "react";
import style from "../styles.module.css";
import { ConfirmDialog } from "primereact/confirmdialog";
import EditTask, { Values } from "./EditTask";
import DropdownButton from "../../common/DropdownButton";
import { Dialog } from "primereact/dialog";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import TaskInfo from "./TaskInfo";
import TimeLeftLine from "./TimeLeftLine";
import CountdownTimer from "./CountdownTimer";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ITaskProps extends ITaskItem {
  deleteTaskHandler: (todolistId: string, taskId: string) => void;
  updateTask: ({ todolistId, taskId, body }: IUpdateTask) => void;
}
const Task = (props: ITaskProps) => {
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false);
  const [checked, setCheked] = useState<boolean | undefined>(
    props.status === 0 ? false : true
  );

  const items = [
    {
      name: "Info",
      icon: "pi-info-circle",
      function: () => setVisibleInfo(true),
    },
    {
      name: "Edit",
      icon: "pi-file-edit",
      function: () => setVisibleEdit(true),
    },
    {
      name: "Delete",
      icon: "pi-trash",
      function: () => setVisibleDelete(true),
    },
  ];
  const propertiesObject = {
    todolistId: props.todoListId,
    taskId: props.id,
    body: {
      title: props.title,
      description: props.description as string,
      completed: props.completed,
      status: props.status,
      priority: props.priority,
      startDate: props.startDate,
      deadline: props.deadline,
    },
  };
  const updateTaskStatus = (checked: boolean | undefined) => {
    props.updateTask({
      ...propertiesObject,
      body: {
        ...propertiesObject.body,
        status: checked ? 1 : 0,
      },
    });
    setCheked(checked);
  };
  const updateTask = ({ description, title, startDate, deadline }: Values) => {
    props.updateTask({
      ...propertiesObject,
      body: {
        ...propertiesObject.body,
        description: description as string,
        title,
        startDate,
        deadline,
      },
    });
  };
  return (
    <div className={style.task}>
      <h3 className={style.taskCheked}>
        <span>
          <Checkbox
            onChange={(e) => updateTaskStatus(e.checked)}
            checked={checked !== undefined ? checked : false}
          ></Checkbox>
          <ConfirmDialog
            visible={visibleDelete}
            onHide={() => setVisibleDelete(false)}
            message="Are you sure  want delete this task?"
            accept={() => props.deleteTaskHandler(props.todoListId, props.id)}
          />
          <EditTask
            updateTask={updateTask}
            visible={visibleEdit}
            setVisible={setVisibleEdit}
            description={props.description}
            title={props.title}
            startDate={props.startDate}
            deadline={props.deadline}
          />

          <Dialog
            header={props.title}
            visible={visibleInfo}
            style={{ width: "330px", maxWidth: "375px" }}
            onHide={() => {
              if (!visibleInfo) return;
              setVisibleInfo(false);
            }}
          >
            <TaskInfo
              description={props.description}
              deadline={props.deadline}
              addedDate={props.addedDate}
              startDate={props.startDate}
            />
          </Dialog>
          <span
            className={
              style.taskTitle + " " + (checked ? style.taskChekedTrue : "")
            }
            onClick={(e) => setVisibleInfo(true)}
          >
            {props.title}
            {checked ||
              (props.deadline !== null && (
                <TimeLeftLine
                  deadline={props.deadline}
                  startDate={props.startDate}
                  addedDate={props.addedDate}
                />
              ))}
            <div className={style.miniTimer}>
              <CountdownTimer deadline={props.deadline} />
            </div>
          </span>
        </span>

        <div>
          <DropdownButton
            className={style.taskMenu}
            headIconsize="23px"
            itemsArray={items}
            headIcon={"pi-bars"}
          />
        </div>
      </h3>

      {/* <div> description={props.description}</div>
      <div> todoListId={props.todoListId}</div>
      <div>order={props.order}</div>
      <div> status={props.status}</div>
      <div>priority={props.priority}</div>
      <div>startDate={props.startDate}</div>
      <div>deadline={props.deadline}</div>
      <div> addedDate={props.addedDate.toString()}</div>
      <div>completed={props.completed}</div> */}
    </div>
  );
};
export default Task;
