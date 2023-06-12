/* eslint-disable @typescript-eslint/no-unused-vars */
import Store from "./Store";

const store = new Store();

// @ts-ignore
const getFormState = () => {
  const state = store.getState();
  const form = state.form ?? {};

  return {
    text: "",
    _lines: [],
    _times: [],
    ...form,
  };
};

// @ts-ignore
const addLine = (_line: string) => {

};
