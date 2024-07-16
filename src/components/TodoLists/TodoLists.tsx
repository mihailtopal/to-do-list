import { useEffect, useState } from "react";
import { useGetAllTodoListsQuery } from "../../api/todoAPI";
import { Navigate } from "react-router-dom";
import { authSelectors } from "../../redux/selectors/authSelectors";
import TodoList from "./TodoList";
import style from "./styles.module.scss";
import Header from "./Header";

const TodoLists = () => {
  const isAuth = authSelectors.GetIsAuth();

  const { data: todoListsFromAPI } = useGetAllTodoListsQuery();
  const [todoLists, setTodoLists] = useState(todoListsFromAPI);

  useEffect(() => {
    setTodoLists(todoListsFromAPI);
  }, [todoListsFromAPI]);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
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
