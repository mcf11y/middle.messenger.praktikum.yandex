

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

export const setUser = (user: any) => {
  store.set("user", user);
};

export const getUser = (): any | null => {
  const state = store.getState();
  const user = (state.user as any) ?? null;

  return user;
};
