import { InputText } from "primereact/inputtext";
import style from "../styles.module.scss";
import { Button } from "primereact/button";
import { useSetNewTodoMutation } from "../../api/todoAPI";
import logo from "../../assets/Rally_Logo.svg";
import logoUser from "../../assets/logoUser.svg";
import { authSelectors } from "../../redux/selectors/authSelectors";
import { useLogOutMutation } from "../../api/authAPI";
import { ErrorMessage, FormikErrors, FormikProvider, useFormik } from "formik";

const Header = () => {
  const name = authSelectors.GetAuthUserName();
  const [setNewTodo] = useSetNewTodoMutation();
  const [logOut] = useLogOutMutation();

  const validate = (values: { title: string }) => {
    const errors: FormikErrors<{ title: string }> = {};
    if (values.title.length === 0) errors.title = "Title is required !";
    else if (values.title.length > 50) errors.title = "Maximum 50 symbols!";
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validate,
    onSubmit: ({ title }, { setSubmitting, resetForm }) => {
      setNewTodo(title);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className={style.head}>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={style.inputGroupHeader}>
          <InputText
            onKeyDown={(e) => e.code === "Enter" && formik.handleSubmit()}
            id="title"
            value={formik.values.title}
            placeholder="New To-do list"
            onChange={formik.handleChange}
            className={formik.errors.title ? style.errorBorder : ""}
          />
          <ErrorMessage
            className={style.error + " " + style.todoListError}
            name="title"
            component="span"
          />
          <Button type="submit" onClick={() => formik.handleSubmit()}>
            Add
            <span> new list</span>
          </Button>
        </div>

        <div className={style.logOut}>
          <img src={logoUser} alt="logoUser" />
          <div>{name}</div>
          <button onClick={() => logOut()}>Log out</button>
        </div>
      </div>
    </FormikProvider>
  );
};

export default Header;
