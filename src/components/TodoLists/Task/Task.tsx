import { Checkbox } from "primereact/checkbox";
import { ITaskItem, IUpdateTask } from "../../../api/todoAPI";
import { useState } from "react";
import style from "../../styles.module.scss";
import { ConfirmDialog } from "primereact/confirmdialog";
import EditTask, { Values } from "./EditTask";
import DropdownButton from "../../common/DropdownButton";
import { Dialog } from "primereact/dialog";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import TaskInfo from "./TaskInfo";
import TimeLeftLine from "./TimeLeftLine";
import Timer from "./Timer";
import dots3x3 from "../../../assets/dots3x3.svg";
import { DragControls, Reorder, useDragControls } from "framer-motion";
import { classNames } from "primereact/utils";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ITaskProps extends ITaskItem {
  deleteTaskHandler: (todolistId: string, taskId: string) => void;
  updateTask: ({ todolistId, taskId, body }: IUpdateTask) => void;
  task: ITaskItem;
  reorder: () => void;
}
const Task = (props: ITaskProps) => {
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false);
  const [checked, setCheked] = useState<boolean | undefined>(
    props.status === 0 ? false : true
  );
  const controls = useDragControls();
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
    <Reorder.Item
      onDragEnd={() => props.reorder()}
      dragControls={controls}
      dragListener={false}
      whileDrag={{
        borderRadius: "4px",
        scale: 1.08,
        boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.15)",
      }}
      value={props.task}
      key={props.task.id}
      style={{
        listStyleType: "none",
        padding: "0",
        marginBlockStart: "0",
      }}
    >
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
        style={{ width: "360px", maxWidth: "375px", borderRadius: "10px" }}
        onHide={() => {
          if (!visibleInfo) return;
          setVisibleInfo(false);
        }}
      >
        <TaskInfo
          status={props.status}
          description={props.description}
          deadline={props.deadline}
          addedDate={props.addedDate}
          startDate={props.startDate}
          setVisibleEdit={setVisibleEdit}
        />
      </Dialog>
      <div className={style.task} onClick={() => setVisibleInfo(true)}>
        <div
          draggable="false"
          onPointerDown={(e) => controls.start(e)}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            draggable="false"
            className={classNames(style.grabDots, "pi", "pi-ellipsis-h")}
          ></span>
          {/* <img
            draggable="false"
            
            src={dots3x3}
            alt="dots3x3"
          /> */}

          {/* <DropdownButton
              className={style.taskMenu}
              headIconsize="16px"
              itemsArray={items}
              headIcon={"pi-ellipsis-v"}
            /> */}
        </div>
        <div className={style.taskCheked}>
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => updateTaskStatus(e.checked)}
            checked={checked !== undefined ? checked : false}
          ></Checkbox>

          <div
            className={classNames(style.taskTitle, {
              [style.taskChekedTrue]: checked,
            })}
          >
            <div style={{ paddingRight: "20px" }}>{props.title}</div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setVisibleDelete(true);
              }}
              className={classNames(style.deleteTaskButton, "pi", "pi-trash")}
            ></span>
          </div>
        </div>
        {checked || (
          <>
            <Timer deadline={props.deadline} />
            <TimeLeftLine
              deadline={props.deadline}
              startDate={props.startDate}
              addedDate={props.addedDate}
            />
          </>
        )}
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
    </Reorder.Item>
  );
};
export default Task;
