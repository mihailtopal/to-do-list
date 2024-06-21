import { ITaskItem } from "../../api/todoAPI";
interface ITaskProps extends ITaskItem {
  deleteTaskHandler: (todolistId: string, taskId: string) => void;
}
const Task = (props: ITaskProps) => {
  return (
    <div>
      <h3>
        TASKS: {props.title}{" "}
        <button
          onClick={() => props.deleteTaskHandler(props.todoListId, props.id)}
        >
          DELETE
        </button>
      </h3>

      <div> id={props.id}</div>
      <div>title={props.title}</div>
      <div> description={props.description}</div>
      <div> todoListId={props.todoListId}</div>
      <div>order={props.order}</div>

      <div>startDate={props.startDate}</div>
      <div>deadline={props.deadline}</div>
      <div> addedDate={props.addedDate.toString()}</div>
      <div>completed={props.completed}</div>
    </div>
  );
};

export default Task;
