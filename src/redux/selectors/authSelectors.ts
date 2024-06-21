import { useSelector } from "../hooks";
import { RootState } from "../store";

export const authSelectors = {
  GetIsAuth: () => {
    return useSelector((state: RootState) => state.profilePage.profile.isAuth);
  },
  GetMainId: () => {
    return useSelector((state: RootState) => state.profilePage.profile.id);
  },
  GetProfile: () => {
    return useSelector((state: RootState) => state.profilePage.profile);
  },

  GetAuthErrorApi: () => {
    return useSelector((state: RootState) => state.errors.authErrors);
  },
  GetAuthUserName: () => {
    return useSelector((state: RootState) => state.profilePage.profile.login);
  },
};
