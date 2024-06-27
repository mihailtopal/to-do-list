import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import style from "./styles.module.css";
import { FormEvent } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Values } from "./EditTask";

export interface IEditFormProps {
  areasKeys: { [key: string]: any };
  visible: boolean;
  setVisible: (arg: boolean) => void;
  submit: (e?: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  handleChange: (e: any) => void;
}
const EditForm = ({
  areasKeys,
  visible,
  setVisible,
  submit,
  disabled,
  handleChange,
}: IEditFormProps) => {
  const renderInputComponent = (
    el: string,
    value: any,
    handleChange: (e: any) => void
  ) => {
    switch (el) {
      case "description":
        return (
          <InputTextarea
            className={style.formInput}
            id={el}
            value={value as string}
            onChange={handleChange}
          />
        );
      case "startDate":
      case "deadline":
        return (
          <Calendar
            className={style.formInput}
            id={el}
            value={value}
            onChange={handleChange}
            showTime
            hourFormat="24"
          />
        );
      default:
        return (
          <InputText
            className={style.formInput}
            id={el}
            value={value as string}
            onChange={handleChange}
          />
        );
    }
  };
  const inputArea = Object.keys(areasKeys).map((el) => (
    <div className={style.form} key={el}>
      <FloatLabel>
        {renderInputComponent(el, areasKeys[el], handleChange)}
        <label htmlFor={el}>{el.charAt(0).toUpperCase() + el.slice(1)}</label>
      </FloatLabel>
    </div>
  ));

  return (
    <ConfirmDialog
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      content={() => (
        <div className={style.formDialog}>
          <form onSubmit={submit} autoComplete="off">
            {inputArea}
            <div className={style.button}>
              <Button icon="pi pi-check" type="submit" disabled={disabled}>
                Add
              </Button>
              <Button
                type="button"
                severity="secondary"
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    ></ConfirmDialog>
  );
};

export default EditForm;
