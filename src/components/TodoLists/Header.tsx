import { InputText } from "primereact/inputtext";
import style from "./styles.module.scss";
import { Button } from "primereact/button";
import { ChangeEvent, useState } from "react";
import { useSetNewTodoMutation } from "../../api/todoAPI";
import logo from "../../assets/Rally_Logo.svg";
import logoUser from "../../assets/logoUser.svg";
import { authSelectors } from "../../redux/selectors/authSelectors";
import { useLogOutMutation } from "../../api/authAPI";

const Header = () => {
  const name = authSelectors.GetAuthUserName();
  const [setNewTodo] = useSetNewTodoMutation();
  const [logOut] = useLogOutMutation();
  const [newListTitile, setNewListTitile] = useState<string>("");
  const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewListTitile(e.currentTarget.value);
  };
  const onSetNewList = () => {
    setNewTodo(newListTitile);
    setNewListTitile("");
  };
  return (
    <div>
      <div className={style.head}>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={style.inputGroupHeader}>
          <InputText
            value={newListTitile}
            placeholder="New To-do list"
            onChange={onChangeNewTitle}
          />
          <Button onClick={() => onSetNewList()}>
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
    </div>
  );
};

export default Header;
