import { ChangeEvent, useEffect, useState } from "react";
import {
  ITodoList,
  useDeleteTaskMutation,
  useDeleteTodoListMutation,
  useGetTasksQuery,
  useSetNewTaskMutation,
  useUpdateTaskMutation,
  useUpdateTodoListMutation,
} from "../../api/todoAPI";
import Task from "./Task/Task";
import style from "./styles.module.css";
import { Card } from "primereact/card";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import EditForm from "./Task/EditForm";
import { FormikErrors, useFormik } from "formik";
import DropdownButton from "../common/DropdownButton";
import FormattedDate from "../common/FormattedDate";
import { Dialog } from "primereact/dialog";
import Tasks from "./Task/Tasks";

const TodoList = ({ id, title, addedDate, order }: ITodoList) => {
  const [setNewTask] = useSetNewTaskMutation();
  const [deleteList] = useDeleteTodoListMutation();
  const [updateList] = useUpdateTodoListMutation();
  const [newTaskTitile, setNewTaskTitile] = useState<string>("");
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false);

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

  const changeVisibleEdit = () => {
    setVisibleEdit(!visibleEdit);
  };
  const changeVisibleDelete = () => {
    setVisibleDelete(!visibleDelete);
  };
  const changeVisibleInfo = () => {
    setVisibleInfo(!visibleInfo);
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
      name: "Info",
      icon: "pi-info-circle",
      function: changeVisibleInfo,
    },
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
      <Dialog
        header={title}
        visible={visibleInfo}
        style={{ width: "330px", maxWidth: "375px" }}
        onHide={() => {
          if (!visibleInfo) return;
          setVisibleInfo(false);
        }}
      >
        <div className={style.dateInfo}>
          <div>
            <span>Added:{"  "}</span>
            <FormattedDate date={addedDate} />
          </div>
        </div>
      </Dialog>
      <div className="card flex justify-content-center"></div>

      <div>
        <div className={style.listTitle}>{title}</div>
        <DropdownButton
          itemsArray={items}
          headIcon="pi-cog"
          className={style.listMenu}
        />

        <div className="p-inputgroup flex-1">
          <InputText
            value={newTaskTitile}
            placeholder="New task"
            onChange={onChangeNewTitle}
          />
          <Button onClick={() => onSetNewTask()}>Add task</Button>
        </div>
        <Tasks listId={id} />
      </div>
    </div>
  );
};

export default TodoList;
