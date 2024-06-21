import { useDispatch } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { FormikHelpers, FormikErrors } from "formik";
import { authSelectors } from "../../redux/selectors/authSelectors";

import { clearApiErrors } from "../../redux/reducers/errors";
import {
  ILoginData,
  useGetCaptchaQuery,
  useLogInMutation,
} from "../../api/authAPI";

import LoginPage from "./LoginPage";

export interface ILoginFormValues extends ILoginData {
  authError: string[];
  captcha?: string;
}

const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();
  const { data: captchaUrl } = useGetCaptchaQuery();
  const initialValues: ILoginFormValues = {
    email: "",
    password: "",
    rememberMe: false,
    captcha: "",
    authError: [],
  };
  const isAuth = authSelectors.GetIsAuth();
  const authErrorApi = authSelectors.GetAuthErrorApi();

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

  const onSubmit = async (
    formData: ILoginFormValues,
    { setSubmitting, validateForm }: FormikHelpers<ILoginFormValues>
  ) => {
    await logIn(formData);
    setTimeout(() => {
      validateForm();
    }, 0);

    setSubmitting(false);
  };
  if (isAuth) {
    return <Navigate to="/todolists" />;
  }
  return (
    <>
      {isAuth && <Navigate to="/todolists" />}
      <LoginPage
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
        captchaUrl={captchaUrl?.url}
      />
    </>
  );
};
export default LoginPageContainer;
