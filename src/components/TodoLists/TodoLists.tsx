import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useGetAllTodoListsQuery,
  useSetNewTodoMutation,
} from "../../api/todoAPI";
import { Navigate } from "react-router-dom";
import { authSelectors } from "../../redux/selectors/authSelectors";
import TodoList from "./TodoList";

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
  const todoListsElements = todoLists?.map((tl) => {
    debugger;
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
      <input
        value={newListTitile}
        placeholder="New To-do list"
        onChange={onChangeNewTitle}
      />
      <button onClick={onSetNewList}>+</button>

      <div>{todoListsElements}</div>
    </div>
  );
};
export default TodoLists;
