import { configureStore } from "@reduxjs/toolkit";
import { todoAPI } from "../api/todoAPI";
import { authAPI } from "../api/authAPI";
import errorsReduser from "./reducers/errors";
import profileReducer from "./reducers/auth-reducers";
const store = configureStore({
  reducer: {
    profilePage: profileReducer,
    errors: errorsReduser,
    [todoAPI.reducerPath]: todoAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoAPI.middleware, authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
