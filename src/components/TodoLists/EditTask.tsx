import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  useFormik,
} from "formik";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

interface IEditTaslProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  description: string | null;
  title: string;
  startDate: string | null;
  deadline: string | null;
}
const EditTask = ({
  visible,
  setVisible,
  description,
  title,
  startDate,
  deadline,
}: IEditTaslProps) => {
  const formik = useFormik({ initialValues: { title: "" } });

  const onSubmit = (
    { title }: any,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    alert(title);
    resetForm();
    setSubmitting(false);
  };

  const validate = (values: any) => {
    const errors: FormikErrors<any> = {};

    return errors;
  };

  const inputArea = (label: string, value?: string) => (
    <FloatLabel>
      <InputText id={label} value={value} />
      <label htmlFor={label}>{label}</label>
    </FloatLabel>
  );
  return (
    <ConfirmDialog
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      content={() => (
        <div
          style={{
            borderRadius: "12px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    component={() => inputArea("title")}
                    type="input"
                    name="title"
                  />
                  <ErrorMessage name="newMessageText" component="span" />
                </div>
                <div>
                  <Field
                    component="input"
                    type="input"
                    name="description"
                    placeholder="Description"
                  />
                  <ErrorMessage name="newMessageText" component="span" />
                </div>

                <Button
                  icon="pi pi-check"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
                <Button severity="secondary" onClick={() => setVisible(false)}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    ></ConfirmDialog>
  );
};

export default EditTask;
