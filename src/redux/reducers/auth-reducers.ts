import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../api/authAPI";

export interface IProfile {
  profile: {
    id: null | number;
    login: null | string;
    email: null | string;
    isAuth: boolean;
  };
}

let initialState: IProfile = {
  profile: {
    id: null,
    login: null,
    email: null,
    isAuth: false,
  },
};

const profileSlice = createSlice({
  name: "profileReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.getAuth.matchFulfilled,
      (state, { payload }) => {
        if (payload.resultCode === 0) {
          if (payload) {
            state.profile = { ...state.profile, ...payload.data };
          }
          state.profile.isAuth = true;
        }
      }
    );
    builder.addMatcher(authAPI.endpoints.logOut.matchFulfilled, (state) => {
      state.profile.id = null;
      state.profile.login = null;
      state.profile.isAuth = false;
    });
  },
});

export default profileSlice.reducer;
