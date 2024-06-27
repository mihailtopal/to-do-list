import { Checkbox } from "primereact/checkbox";
import { ITaskItem, IUpdateTask } from "../../api/todoAPI";
import { useState } from "react";
import style from "./styles.module.css";
import { classNames } from "primereact/utils";
import { ConfirmDialog } from "primereact/confirmdialog";
import EditTask, { Values } from "./EditTask";

interface ITaskProps extends ITaskItem {
  deleteTaskHandler: (todolistId: string, taskId: string) => void;
  updateTask: ({ todolistId, taskId, body }: IUpdateTask) => void;
}
const Task = (props: ITaskProps) => {
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [checked, setCheked] = useState<boolean | undefined>(
    props.status === 0 ? false : true
  );
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
    <div>
      <h3 className={style.taskCheked}>
        <span
          className={checked ? style.taskChekedTrue : style.taskChekedFalse}
        >
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
          <span className={style.title}>{props.title}</span>
          <button
            onClick={() => setVisibleEdit(true)}
            className={style.editButton}
          >
            edit
          </button>
        </span>

        <span
          onClick={() => setVisibleDelete(true)}
          className={classNames(
            style.deleteTask,
            style.icons,
            "pi",
            "pi-delete-left"
          )}
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
