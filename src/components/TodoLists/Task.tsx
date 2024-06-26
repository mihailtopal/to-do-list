import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { ITaskItem } from "../../api/todoAPI";
import { useState } from "react";
import style from "./styles.module.css";
import { classNames } from "primereact/utils";
interface ITaskProps extends ITaskItem {
  deleteTaskHandler: (todolistId: string, taskId: string) => void;
}
const Task = (props: ITaskProps) => {
  const [checked, setChecked] = useState<boolean | undefined>(false);
  return (
    <div>
      {/* <h3>
        TASKS: {props.title}{" "}
        <button
          onClick={() => props.deleteTaskHandler(props.todoListId, props.id)}
        >
          DELETE
        </button>
      </h3> */}

      {/* <div> id={props.id}</div> */}

      <h3 className={style.taskCheked}>
        <span
          className={checked ? style.taskChekedTrue : style.taskChekedFalse}
        >
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked !== undefined ? checked : false}
          ></Checkbox>
          <span>{props.title}</span>
        </span>

        <span
          onClick={() => props.deleteTaskHandler(props.todoListId, props.id)}
          className={classNames(style.deleteTask, "pi", "pi-delete-left")}
        ></span>
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
