import { useEffect, useState } from "react";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../../api/todoAPI";
import Task from "../Task/Task";
import { Reorder } from "framer-motion";

const Tasks = ({ listId }: { listId: string }) => {
  const { data: tasksFromAPI } = useGetTasksQuery(listId);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [tasks, setTasks] = useState(tasksFromAPI?.items);
  const deleteTaskHandler = (todolistId: string, taskId: string) => {
    deleteTask({ todolistId: todolistId, taskId: taskId });
  };
  useEffect(() => {
    setTasks(tasksFromAPI?.items);
  }, [tasksFromAPI]);

  return (
    <Reorder.Group
      as="ol"
      values={tasks ? tasks : []}
      onReorder={setTasks}
      style={{
        paddingInlineStart: "0",
      }}
    >
      {tasks?.map((task) => (
        <Reorder.Item
          whileDrag={{
            scale: 1.05,
          }}
          value={task}
          key={task.order}
          style={{ listStyleType: "none", padding: "0", marginBlockStart: "0" }}
        >
          <Task
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
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default Tasks;
