import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  Captcha = 10,
}

export interface IResultCode {
  resultCode: ResultCodesEnum;
  messages?: Array<string>;
}
export interface IAuthData {
  email: string;
  id: null;
  login: string;
}

export interface ILoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}
export type APIResponseType<D = {}, M = Array<string>, RC = ResultCodesEnum> = {
  data: D;
  messages: M;
  resultCode: RC;
};
export interface ICaptchaUrlResponse {
  url: string;
}

export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set("API-KEY", "073d42b3-3aaa-49a9-8654-b2618c6f31b6");
      return headers;
    },
    baseUrl: "https://social-network.samuraijs.com/api/1.1",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getAuth: build.query<APIResponseType<IAuthData>, void>({
      query: () => `auth/me`,
      providesTags: () => [{ type: "Auth", id: "auth" }],
    }),

    logIn: build.mutation<APIResponseType, ILoginData>({
      query: (loginData) => ({
        url: `auth/login`,
        method: "POST",
        body: { ...loginData },
      }),
      invalidatesTags: () => [{ type: "Auth", id: "auth" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          debugger;
          if (data.resultCode === ResultCodesEnum.Captcha) {
            await dispatch(
              authAPI.endpoints.getCaptcha.initiate(undefined, {
                forceRefetch: true,
              })
            );
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    logOut: build.mutation<APIResponseType, void>({
      query: () => ({
        url: `auth/login`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Auth", id: "auth" }],
    }),
    getCaptcha: build.query<ICaptchaUrlResponse, void>({
      query: () => `security/get-captcha-url`,
    }),
  }),
});
export const {
  useGetAuthQuery,
  useLogInMutation,
  useLogOutMutation,
  useGetCaptchaQuery,
} = authAPI;
