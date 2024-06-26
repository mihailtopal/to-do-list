import { ChangeEvent, useState } from "react";
import {
  ITodoList,
  useDeleteTaskMutation,
  useDeleteTodoListMutation,
  useGetTasksQuery,
  useSetNewTaskMutation,
} from "../../api/todoAPI";
import Task from "./Task";
import style from "./styles.module.css";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const TodoList = ({ id, title, addedDate, order }: ITodoList) => {
  const [setNewTask] = useSetNewTaskMutation();
  const { data: tasks } = useGetTasksQuery(id);
  const [deleteList] = useDeleteTodoListMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [newTaskTitile, setNewTaskTitile] = useState<string>("");
  let dateObject = new Date(addedDate);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const deleteTaskHandler = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId: todolistId, taskId: taskId });
  };

  const tasksElements = tasks?.items.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        todoListId={task.todoListId}
        order={task.order}
        status={task.status}
        priority={task.priority}
        startDate={task.startDate}
        deadline={task.deadline}
        addedDate={task.addedDate}
        completed={task.completed}
        deleteTaskHandler={deleteTaskHandler}
      />
    );
  });
  const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const onSetNewTask = () => {
    setNewTask({ todolistId: id, title: newTaskTitile });

    setNewTaskTitile("");
  };
  return (
    <div className={style.todoListItem}>
      <ConfirmDialog
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="Are you sure  want delete this list?"
        accept={() => deleteList(id)}
      />

      <div className="card flex justify-content-center"></div>
      <div className={style.deleteListButton}>
        <span
          className={classNames(style.icons, style.iconTrash, "pi", "pi-trash")}
          onClick={() => setVisibleDelete(true)}
        ></span>
      </div>

      <Card title={title}>
        <div>{formattedDate}</div>
        <InputText
          value={newTaskTitile}
          placeholder="New task"
          onChange={onChangeNewTitle}
        ></InputText>
        <Button onClick={() => onSetNewTask()}>Add task</Button>
        {/* <div>id: {id}</div> */}
        {/* <div>order: {order}</div> */}
        {/* <div>
          <input
            value={newTaskTitile}
            placeholder="New task"
            onChange={onChangeNewTitle}
          />
          <button onClick={onSetNewTask}>+</button>
        </div> */}
        {tasksElements}
      </Card>
    </div>
  );
};

export default TodoList;
