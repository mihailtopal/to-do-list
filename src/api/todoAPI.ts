import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIResponseType } from "./authAPI";

export interface ITodoList {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}
export interface IPostData {
  todolistId: string;
  title: string;
}
export interface IUpdateTask {
  todolistId: string;
  taskId: string;
  body: {
    title: string;
    description: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: null | string;
    deadline: null | string;
  };
}
export interface IReorderTask {
  todolistId: string;
  taskId: string;
  putAfterItemId: string;
}

export interface ITaskItem {
  id: string;
  title: string;
  description: null | string;
  todoListId: string;
  order: number;
  status: number;
  priority: number;
  startDate: null | string;
  deadline: null | string;
  addedDate: string;
  completed: boolean;
}

export interface ITasksResponse {
  items: Array<ITaskItem>;
  totalCount: number;
  error: null | Array<string>;
}

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  tagTypes: ["Todo"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set("API-KEY", "073d42b3-3aaa-49a9-8654-b2618c6f31b6");
      return headers;
    },
    baseUrl: "https://social-network.samuraijs.com/api/1.1",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getAllTodoLists: build.query<Array<ITodoList>, void>({
      query: () => `/todo-lists`,
      providesTags: () => [{ type: "Todo", id: "lists" }],
    }),
    getTasks: build.query<ITasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: () => [{ type: "Todo", id: "tasks" }],
    }),
    setNewTodo: build.mutation<APIResponseType<{ item: ITodoList }>, string>({
      query: (title) => ({
        url: `/todo-lists`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: () => [{ type: "Todo", id: "lists" }],
    }),
    setNewTask: build.mutation<APIResponseType<{ item: ITaskItem }>, IPostData>(
      {
        query: ({ todolistId, title }) => ({
          url: `/todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title },
        }),
        invalidatesTags: () => [{ type: "Todo", id: "tasks" }],
      }
    ),
    updateTask: build.mutation<
      APIResponseType<{ item: ITaskItem }>,
      IUpdateTask
    >({
      query: ({ todolistId, taskId, body }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: () => [{ type: "Todo", id: "tasks" }],
    }),
    deleteTask: build.mutation<
      APIResponseType,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Todo", id: "tasks" }],
    }),
    reorderTask: build.mutation<APIResponseType, IReorderTask>({
      query: ({ todolistId, taskId, putAfterItemId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        method: "DELETE",
        body: { putAfterItemId },
      }),
      invalidatesTags: () => [{ type: "Todo", id: "tasks" }],
    }),
    updateTodoList: build.mutation<APIResponseType, IPostData>({
      query: ({ title, todolistId }) => ({
        url: `/todo-lists/${todolistId}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: () => [{ type: "Todo", id: "lists" }],
    }),
    deleteTodoList: build.mutation<APIResponseType, string>({
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Todo", id: "lists" }],
    }),
    reorderTodoList: build.mutation<APIResponseType, IPostData>({
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}/reorder`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Todo", id: "lists" }],
    }),
  }),
});
export const {
  useReorderTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useSetNewTaskMutation,
  useDeleteTodoListMutation,
  useGetAllTodoListsQuery,
  useReorderTodoListMutation,
  useUpdateTodoListMutation,
  useSetNewTodoMutation,
} = todoAPI;
