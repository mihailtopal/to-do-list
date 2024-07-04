import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useGetAllTodoListsQuery,
  useSetNewTodoMutation,
} from "../../api/todoAPI";
import { Navigate } from "react-router-dom";
import { authSelectors } from "../../redux/selectors/authSelectors";
import TodoList from "./TodoList";
import style from "./styles.module.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Reorder } from "framer-motion";

const TodoLists = () => {
  const isAuth = authSelectors.GetIsAuth();
  const [setNewTodo] = useSetNewTodoMutation();
  const { data: todoListsFromAPI } = useGetAllTodoListsQuery();
  const [todoLists, setTodoLists] = useState(todoListsFromAPI);
  const [newListTitile, setNewListTitile] = useState<string>("");
  useEffect(() => {
    setTodoLists(todoListsFromAPI);
  }, [todoListsFromAPI]);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

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
        <div className="p-inputgroup flex-1">
          <InputText
            value={newListTitile}
            placeholder="New To-do list"
            onChange={onChangeNewTitle}
          />
          <Button onClick={() => onSetNewList()}>Add new list</Button>
        </div>
      </div>

      <div className={style.todoLists}>
        {todoLists
          ?.filter((list) => list.order !== undefined && !isNaN(list.order))
          .map((list, index, array) => {
            return (
              <TodoList
                key={list.id}
                id={list.id}
                title={list.title}
                addedDate={list.addedDate}
                order={list.order}
              />
            );
          })}
      </div>
    </div>
  );
};
export default TodoLists;
