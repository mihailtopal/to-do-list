import { ChangeEvent, useState } from "react";
import {
  ITodoList,
  useDeleteTaskMutation,
  useDeleteTodoListMutation,
  useGetTasksQuery,
  useSetNewTaskMutation,
} from "../../api/todoAPI";
import Task from "./Task";

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
    <div>
      <h1>
        To-do: {title}
        <button onClick={() => deleteList(id)}>X</button>
      </h1>

      <div>id: {id}</div>
      <div>addedDate: {formattedDate}</div>
      <div>order: {order}</div>
      <div>
        <input
          value={newTaskTitile}
          placeholder="New task"
          onChange={onChangeNewTitle}
        />
        <button onClick={onSetNewTask}>+</button>
      </div>
      {tasksElements}
    </div>
  );
};

export default TodoList;
