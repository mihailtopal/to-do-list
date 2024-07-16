import { useDispatch } from "../../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FormikHelpers,
  FormikErrors,
  useFormik,
  FormikProvider,
  ErrorMessage,
} from "formik";
import { authSelectors } from "../../redux/selectors/authSelectors";
import style from "../TodoLists/styles.module.scss";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { clearApiErrors } from "../../redux/reducers/errors";
import {
  ILoginData,
  useGetCaptchaQuery,
  useLogInMutation,
} from "../../api/authAPI";

import { useEffect } from "react";

export interface ILoginFormValues extends ILoginData {
  authError: string[];
  captcha?: string;
}

const LoginPageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();
  const { data: captchaUrl } = useGetCaptchaQuery();

  const validate = (values: ILoginFormValues) => {
    const errors: FormikErrors<ILoginFormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length === 0) {
      errors.password = "Enter password";
    }
    if (authErrorApi.length > 0) {
      errors.email = authErrorApi[0];
    }
    dispatch(clearApiErrors());
    return errors;
  };

  const formik = useFormik<ILoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
      authError: [],
    },
    validate,
    onSubmit: async (
      formData: ILoginFormValues,
      { setSubmitting, validateForm }: FormikHelpers<ILoginFormValues>
    ) => {
      await logIn(formData);
      setTimeout(() => {
        validateForm();
      }, 0);

      setSubmitting(false);
    },
  });
  const isAuth = authSelectors.GetIsAuth();
  const authErrorApi = authSelectors.GetAuthErrorApi();
  useEffect(() => {
    if (isAuth) {
      debugger;
      navigate("/todolists");
    }
  }, [isAuth, navigate]);

  return (
    <FormikProvider value={formik}>
      <div className={style.loginForm}>
        <div className="myComponent">
          <h2>Welcome to the Rally</h2>
          <form
            className={style.form}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <div>
              <div className={style.loginInputElement}>
                <FloatLabel>
                  <InputText
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="email">User Email</label>
                </FloatLabel>
                <ErrorMessage
                  className={style.error}
                  name="email"
                  component="span"
                />
              </div>
              <div className={style.loginInputElement}>
                <FloatLabel>
                  <InputText
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="password">Password</label>
                </FloatLabel>
                <ErrorMessage
                  className={style.error}
                  name="password"
                  component="span"
                />
              </div>

              {captchaUrl && (
                <div className={style.loginInputElement}>
                  <div className={style.captcha}>
                    <img src={captchaUrl.url} alt="captcha" />
                  </div>
                  <FloatLabel>
                    <InputText
                      name="captcha"
                      id="captcha"
                      value={formik.values.captcha}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="captcha">Captcha</label>
                  </FloatLabel>

                  <ErrorMessage
                    className={style.error}
                    name="captcha"
                    component="span"
                  />
                </div>
              )}
              <div className={style.checkbox}>
                <Checkbox
                  inputId="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={(e) =>
                    formik.setFieldValue("rememberMe", e.checked)
                  }
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>

              <div className={style.button}>
                <Button
                  type="submit"
                  label=" Let's start"
                  disabled={formik.isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
};
export default LoginPageContainer;
