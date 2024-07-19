import style from "../.././styles.module.scss";
import { InputText } from "primereact/inputtext";
import { ErrorMessage, FormikErrors, FormikProvider, useFormik } from "formik";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useSetNewTaskMutation } from "../../../api/todoAPI";
import { MutableRefObject, useRef } from "react";
interface TodoListSetNewTaskProps {
  listId: string;
}

const TodoListSetNewTask = ({ listId }: TodoListSetNewTaskProps) => {
  const [setNewTask] = useSetNewTaskMutation();

  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      formik.resetForm();
      formik.setErrors({});
    }

    removeEventListener();
  };
  const addEventListener = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };

  const removeEventListener = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

  const validate = (values: { newTaskTitle: string }) => {
    const errors: FormikErrors<{ newTaskTitle: string }> = {};

    if (values.newTaskTitle.length > 50)
      errors.newTaskTitle = "Maximum 50 symbols";
    else if (values.newTaskTitle.length === 0)
      errors.newTaskTitle = "Title is required !";

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      newTaskTitle: "",
    },
    validate,
    onSubmit: ({ newTaskTitle }, { setSubmitting, resetForm }) => {
      setNewTask({ todolistId: listId, title: newTaskTitle });
      setSubmitting(false);
      resetForm();
    },
  });
  return (
    <FormikProvider value={formik}>
      <div ref={containerRef} className={style.newTaskTitleInput}>
        <IconField>
          <InputIcon
            type="submit"
            className="pi pi-plus"
            onClick={() => {
              addEventListener();
              formik.handleSubmit();
            }}
          ></InputIcon>
          <InputText
            id="newTaskTitle"
            onKeyDown={(e) => e.code === "Enter" && formik.handleSubmit()}
            style={{ width: "100%", borderRadius: "5px" }}
            v-model="value1"
            value={formik.values.newTaskTitle}
            placeholder="New task"
            className={formik.errors.newTaskTitle ? style.errorBorder : ""}
            onChange={formik.handleChange}
            onClick={() => addEventListener()}
          />
        </IconField>
        <ErrorMessage
          className={style.error}
          name="newTaskTitle"
          component="span"
        />
      </div>
    </FormikProvider>
  );
};

export default TodoListSetNewTask;
