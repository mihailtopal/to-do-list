import { MutableRefObject, useRef, useState } from "react";
import style from "../.././styles.module.scss";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { ErrorMessage, FormikErrors, FormikProvider, useFormik } from "formik";
import DropdownButton from "../../common/DropdownButton";
import {
  useDeleteTodoListMutation,
  useUpdateTodoListMutation,
} from "../../../api/todoAPI";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import FormattedDate from "../../common/FormattedDate";

interface ITodoListTitleProps {
  title: string;
  listId: string;
  addedDate: string;
}

const TodoListTitle = ({ title, listId, addedDate }: ITodoListTitleProps) => {
  const [updateList] = useUpdateTodoListMutation();
  const [deleteList] = useDeleteTodoListMutation();
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false);
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      formik.resetForm();
      setTimeout(() => {
        setVisibleEdit(false);
      }, 100);
    }
    removeEventListener();
  };

  const validate = (values: { title: string }) => {
    const errors: FormikErrors<{ title: string }> = {};
    if (values.title.length === 0) errors.title = "Title is required !";
    else if (values.title.length > 30) errors.title = "Maximum 30 symbols";
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: title,
    },
    validate,
    onSubmit: ({ title }, { setSubmitting, resetForm }) => {
      updateList({
        title,
        todolistId: listId,
      });
      setVisibleEdit(false);
      setSubmitting(false);
      resetForm();
    },
  });

  const items = [
    {
      name: "Info",
      icon: "pi-info-circle",
      function: () => setVisibleInfo(true),
    },
    {
      name: "Edit",
      icon: "pi-file-edit",
      function: () => {
        addEventListener();
        setVisibleEdit(true);
      },
    },
    {
      name: "Delete",
      icon: "pi-trash",
      function: () => setVisibleDelete(true),
    },
  ];

  const addEventListener = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };

  const removeEventListener = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

  return (
    <FormikProvider value={formik}>
      <div className={style.listTitle}>
        <ConfirmDialog
          visible={visibleDelete}
          onHide={() => setVisibleDelete(false)}
          message="Are you sure  want delete this list?"
          accept={() => deleteList(listId)}
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
        <div
          ref={containerRef}
          onClick={() => {
            addEventListener();
            setVisibleEdit(true);
          }}
        >
          {visibleEdit ? (
            <IconField iconPosition="right" style={{ width: "310px" }}>
              <InputIcon
                style={{ color: "#6FCAA9" }}
                disabled={formik.isSubmitting}
                className="pi pi-check"
                onClick={() => formik.handleSubmit()}
              />

              <InputText
                id="title"
                name="title"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  fontFamily: "Inter Tight, sans-serif",
                  fontWeight: "550",
                  fontSize: "18px",
                }}
                value={formik.values.title}
                placeholder="List Title"
                onChange={formik.handleChange}
                className={formik.errors.title ? style.errorBorder : ""}
                autoFocus={true}
              />
            </IconField>
          ) : (
            <span>{title}</span>
          )}
          <ErrorMessage className={style.error} name="title" component="span" />
        </div>
        {visibleEdit || (
          <DropdownButton
            headIconsize="16px"
            itemsArray={items}
            headIcon="pi-ellipsis-v"
            className={style.listMenu}
          />
        )}
      </div>
    </FormikProvider>
  );
};

export default TodoListTitle;
