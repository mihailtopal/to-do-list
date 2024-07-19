import { useEffect, useRef, useState } from "react";
import { ITodoList } from "../../../api/todoAPI";
import style from "../.././styles.module.scss";
import Tasks from "../Task/Tasks";
import React from "react";
import TodoListTitle from "./TodoListTitle";
import TodoListSetNewTask from "./TodoListSetNewTask";

const TodoList = React.memo(({ id, title, addedDate, order }: ITodoList) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (elementRef.current) {
          const elementHeight =
            elementRef.current.getBoundingClientRect().height;
          const numberOfRows = Math.round(elementHeight + 10);
          setHeight(numberOfRows);
        }
      });

      resizeObserver.observe(elementRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={elementRef}
      className={style.todoListItem}
      style={{ gridRowEnd: `span ${height}` }}
    >
      <TodoListTitle title={title} listId={id} addedDate={addedDate} />
      <Tasks listId={id} />
      <TodoListSetNewTask listId={id} />
    </div>
  );
});

export default TodoList;
