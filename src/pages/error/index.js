import Button from "../../components/button";
import Title from "../../components/title";
import CenteredWrapper from '../../components/centeredWrapper';

import template from "./error.hbs";

const ErrorPage = ({ code, message }) =>
  CenteredWrapper({
    content: template({
      title: Title({
        text: code,
        size: "xl",
      }),
      message,
      button: Button({
        id: "error-page-btn",
        variant: "link",
        text: "Вернуться к чатам",
      }),
    })
  })

export default ErrorPage;
