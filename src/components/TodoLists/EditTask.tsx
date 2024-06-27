import { FormikErrors, FormikHelpers, useFormik } from "formik";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect } from "react";
import EditForm from "./EditForm";

dayjs.extend(utc);
dayjs.extend(timezone);

interface IEditTaslProps {
  updateTask: ({ description, title, startDate, deadline }: Values) => void;
  visible: boolean;
  setVisible: (arg: boolean) => void;
  description: string | null;
  title: string;
  startDate: Date | string | null;
  deadline: Date | string | null;
}
export type Values = Omit<
  IEditTaslProps,
  "visible" | "setVisible" | "updateTask"
>;

const EditTask = ({
  visible,
  setVisible,
  description,
  title,
  startDate,
  deadline,
  updateTask,
}: IEditTaslProps) => {
  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};
    return errors;
  };
  const formik = useFormik<Values>({
    initialValues: {
      title: title,
      description: description,
      startDate: new Date(dayjs.utc(startDate).local().toString()),
      deadline: new Date(dayjs.utc(deadline).local().toString()),
    },
    validate,
    onSubmit: (
      { title, description, startDate, deadline }: Values,
      { setSubmitting }: FormikHelpers<Values>
    ) => {
      updateTask({ title, description, startDate, deadline });
      console.log(startDate);
      setSubmitting(false);
      setVisible(false);
    },
  });
  useEffect(() => {
    formik.resetForm({
      values: {
        title: title,
        description: description,
        startDate: startDate
          ? new Date(dayjs.utc(startDate).local().toString())
          : null,
        deadline: deadline
          ? new Date(dayjs.utc(deadline).local().toString())
          : null,
      },
    });
  }, [title, description, startDate, deadline]);

  return (
    <EditForm
      handleChange={formik.handleChange}
      areasKeys={formik.values}
      visible={visible}
      setVisible={setVisible}
      submit={formik.handleSubmit}
      disabled={formik.isSubmitting}
    />
  );
};

export default EditTask;
