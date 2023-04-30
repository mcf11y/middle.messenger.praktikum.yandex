import Button from "../../components/button";
import Title from "../../components/title";
import CenteredWrapper from "../../components/centeredWrapper";

import template from "./error.hbs";

type Props = {
	code: string | number;
	message: string;
};

const ErrorPage = ({code, message}: Props) => CenteredWrapper({
  content: template({
    title: Title({
      text: code.toString(),
      size: "xl",
    }),
    message,
    button: Button({
      id: "error-page-btn",
      variant: "link",
      text: "Вернуться к чатам",
    }),
  }),
});

export default ErrorPage;
