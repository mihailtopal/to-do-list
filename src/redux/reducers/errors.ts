import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../api/authAPI";
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  Captcha = 10,
}
export interface ICaptchaUrlResponse {
  url: string;
}

export interface IErrors {
  authErrors: string | string[];
  captchaUrl: string;
}

let initialState: IErrors = {
  authErrors: "",
  captchaUrl: "",
};

const errorsSlice = createSlice({
  name: "errorsReduser",
  initialState,
  reducers: {
    clearApiErrors: (state) => {
      state.authErrors = "";
    },
    setLoginError: (state, action: PayloadAction<string[]>) => {
      state.authErrors = action.payload;
    },
    getCaptchaUrlSuccess: (
      state,
      action: PayloadAction<ICaptchaUrlResponse>
    ) => {
      state.captchaUrl = action.payload.url;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.getCaptcha.matchFulfilled,
      (state, { payload }) => {
        debugger;
        if (payload) state.captchaUrl = payload.url;
      }
    );
    builder.addMatcher(
      authAPI.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        debugger;
        if (payload.resultCode !== ResultCodesEnum.Success) {
          state.authErrors = payload.messages;
        } else if (payload.resultCode === ResultCodesEnum.Success) {
          state.captchaUrl = "";
        }
      }
    );
  },
});

export const { clearApiErrors, setLoginError, getCaptchaUrlSuccess } =
  errorsSlice.actions;
export default errorsSlice.reducer;
