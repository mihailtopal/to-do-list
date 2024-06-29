import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  ITodoList,
  useDeleteTaskMutation,
  useDeleteTodoListMutation,
  useGetTasksQuery,
  useSetNewTaskMutation,
  useUpdateTaskMutation,
  useUpdateTodoListMutation,
} from "../../api/todoAPI";
import Task from "./Task";
import style from "./styles.module.css";
import { Card } from "primereact/card";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import EditForm from "./EditForm";
import { FormikErrors, useFormik } from "formik";
import DropdownButton from "../common/DropdownButton";

dayjs.extend(utc);
dayjs.extend(timezone);

const TodoList = ({ id, title, addedDate, order }: ITodoList) => {
  const [setNewTask] = useSetNewTaskMutation();
  const { data: tasks } = useGetTasksQuery(id);
  const [deleteList] = useDeleteTodoListMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [updateList] = useUpdateTodoListMutation();
  const [newTaskTitile, setNewTaskTitile] = useState<string>("");
  let dateObject = new Date(dayjs.utc(addedDate).local().toString());
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);

  const deleteTaskHandler = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId: todolistId, taskId: taskId });
  };
  const validate = (values: { title: string }) => {
    const errors: FormikErrors<{ title: string }> = {};
    if (values.title.length === 0) errors.title = "Title is !";
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      title: title,
    },
    validate,
    onSubmit: ({ title }, { setSubmitting }) => {
      updateList({
        title,
        todolistId: id,
      });
      setSubmitting(false);
      setVisibleEdit(false);
    },
  });

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
        updateTask={updateTask}
      />
    );
  });
  const changeVisibleEdit = () => {
    setVisibleEdit(!visibleEdit);
  };
  const changeVisibleDelete = () => {
    setVisibleDelete(!visibleDelete);
  };
  const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const onSetNewTask = () => {
    setNewTask({ todolistId: id, title: newTaskTitile });
    setNewTaskTitile("");
  };
  const items = [
    {
      name: "Edit",
      icon: "pi-file-edit",
      function: changeVisibleEdit,
    },
    {
      name: "Delete",
      icon: "pi-trash",
      function: changeVisibleDelete,
    },
  ];
  return (
    <div className={style.todoListItem}>
      <ConfirmDialog
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="Are you sure  want delete this list?"
        accept={() => deleteList(id)}
      />
      <EditForm
        areasKeys={formik.values}
        visible={visibleEdit}
        setVisible={setVisibleEdit}
        submit={formik.handleSubmit}
        disabled={formik.isSubmitting}
        handleChange={formik.handleChange}
      />
      <div className="card flex justify-content-center"></div>
      <DropdownButton itemsArray={items} headIcon={"pi-cog"} />

      <Card title={title}>
        <div>{formattedDate}</div>
        <div className="p-inputgroup flex-1">
          <InputText
            value={newTaskTitile}
            placeholder="New task"
            onChange={onChangeNewTitle}
          />
          <Button onClick={() => onSetNewTask()}>Add task</Button>
        </div>
        {tasksElements}
      </Card>
    </div>
  );
};

export default TodoList;
