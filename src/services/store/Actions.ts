import { IUser } from "types/models";

import Store from "./store";

const store = new Store();

// @ts-ignore
// export const getFormState = () => {
//   const state = store.getState();
//   const form = state.form ?? {};

//   return {
//     text: "",
//     _lines: [],
//     _times: [],
//     ...form,
//   };
// };

export const setUser = (user: IUser) => {
  store.set("user", user);
};

export const getUser = (): IUser | null => {
  const state = store.getState();
  const user = (state.user as IUser) ?? null;

  return user;
};
