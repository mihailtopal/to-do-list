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

const TodoLists = () => {
  const isAuth = authSelectors.GetIsAuth();
  const [setNewTodo] = useSetNewTodoMutation();
  const { data: todoLists } = useGetAllTodoListsQuery();
  const [newListTitile, setNewListTitile] = useState<string>("");
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
  const todoListsElements = todoLists
    ?.filter((tl) => tl.order !== undefined && !isNaN(tl.order))
    .sort((a, b) => b.order - a.order)
    .map((tl) => {
      return (
        <TodoList
          key={tl.id}
          id={tl.id}
          title={tl.title}
          addedDate={tl.addedDate}
          order={tl.order}
        />
      );
    });
  return (
    <div>
      <div className={style.head}>
        <input
          value={newListTitile}
          placeholder="New To-do list"
          onChange={onChangeNewTitle}
        />
        <Button onClick={onSetNewList}>Add new list</Button>
      </div>

      <div className={style.todoLists}>{todoListsElements}</div>
    </div>
  );
};
export default TodoLists;
