import Button from "../../components/button";

import template from "./error.hbs";
import * as styles from "./error.module.scss";

const ErrorPage = ({ code, message }) => {
  return template({
    title: code,
    message,
    button: Button({
      id: "error-page-btn",
      view: "link",
      text: "Вернуться к чатам",
    }),
    styles,
  });
};

export default ErrorPage;
