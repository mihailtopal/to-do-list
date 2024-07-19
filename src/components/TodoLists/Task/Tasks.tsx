import React, { useEffect, useState } from "react";
import {
  ITaskItem,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useReorderTaskMutation,
  useUpdateTaskMutation,
} from "../../../api/todoAPI";
import Task from "../Task/Task";
import { Reorder } from "framer-motion";

const Tasks = React.memo(({ listId }: { listId: string }) => {
  const { data: tasksFromAPI } = useGetTasksQuery(listId);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [reorderTask] = useReorderTaskMutation();
  const [tasks, setTasks] = useState(tasksFromAPI?.items);

  const deleteTaskHandler = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId: todolistId, taskId: taskId });
  };
  useEffect(() => {
    setTasks(tasksFromAPI?.items);
  }, [tasksFromAPI]);
  const reorder = (
    currentTask: ITaskItem,
    beforeTask: ITaskItem | undefined
  ) => {
    const thisTaskId = currentTask.id;
    const beforeTaskId = beforeTask?.id || null;
    reorderTask({
      todolistId: listId,
      taskId: thisTaskId,
      putAfterItemId: beforeTaskId,
    });
  };

  console.log("RErender tasks", listId);
  return (
    <Reorder.Group
      values={tasks ? tasks : []}
      onReorder={setTasks}
      style={{
        paddingInlineStart: "0",
      }}
    >
      {tasks?.map((task, index, array) => {
        return (
          <Task
            reorder={() => reorder(task, array[index - 1])}
            task={task}
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            todoListId={task.todoListId}
            order={task.order}
            status={task.status}
            priority={task.priority}
            startDate={task.startDate}
            deadline={task.deadline}
            addedDate={task.addedDate}
            completed={task.completed}
            deleteTaskHandler={deleteTaskHandler}
            updateTask={updateTask}
          />
        );
      })}
    </Reorder.Group>
  );
});

export default Tasks;
