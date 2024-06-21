import style from "./LoginPage.module.css";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikHelpers,
} from "formik";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { ILoginFormValues } from "./LoginPageContainer";

export interface ILoginPageProps {
  initialValues: ILoginFormValues;
  validate: (values: ILoginFormValues) => FormikErrors<ILoginFormValues>;
  onSubmit: (
    formData: ILoginFormValues,
    { setSubmitting, validateForm }: FormikHelpers<ILoginFormValues>
  ) => Promise<void>;
  captchaUrl: string | undefined;
}

const LoginPage = ({
  initialValues,
  validate,
  onSubmit,
  captchaUrl,
}: ILoginPageProps) => {
  return (
    <div className={style.loginForm}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <div className="myComponent">
            <h2>Log In</h2>
            <Form className={style.form}>
              <div>
                <div>
                  <div className={style.inputElement}>
                    <Field
                      className={style.inputArea}
                      type="email"
                      name="email"
                      placeholder="email"
                    />
                    <ErrorMessage
                      className={style.error}
                      name="email"
                      component="span"
                    />
                  </div>
                  <div className={style.inputElement}>
                    <Field
                      className={style.inputArea}
                      type="password"
                      name="password"
                      placeholder="password"
                    />
                    <ErrorMessage
                      className={style.error}
                      name="password"
                      component="span"
                    />
                  </div>

                  {captchaUrl && (
                    <div
                      className={style.captchaForm + " " + style.inputElement}
                    >
                      <Field
                        className={style.inputArea + " " + style.inputElement}
                        type="input"
                        name="captcha"
                        placeholder="captcha"
                      />
                      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
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
                      checked={values.rememberMe}
                      onChange={(e) => setFieldValue("rememberMe", e.checked)}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                  </div>

                  <div className={style.button}>
                    <Button
                      type="submit"
                      label=" Log In"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;

// const Login = (props) => {
//   const dispatch = useDispatch();
//   const isAuth = useSelector((state) => state.profilePage.authProfile.isAuth);
//   if (isAuth) {
//     return <Navigate to="/profile" />;
//   }
//   const onSubmit = (formData) => {
//     dispatch(logInProfile(formData));
//   };
//   return (
//     <>
//       <h1>Login</h1>
//       <LoginReduxForm onSubmit={onSubmit} />
//     </>
//   );
// };
// const LoginForm = (props) => {
//   const { handleSubmit } = props;

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <Field placeholder="Login" name="login" component="input" />
//       </div>
//       <div>
//         <Field placeholder="Password" name="password" component="input" />
//       </div>
//       <div>
//         <Field name="rememberMe" component="input" type="checkbox" /> Remember
//         me
//       </div>
//       <button>Login</button>
//     </form>
//   );
// };
