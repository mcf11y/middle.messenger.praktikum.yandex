import PAGE_URL from "constants/page-urls";
import Block from "services/block";
import Router from "services/router";

import Button from "components/Button";
import CenteredWrapper from "components/CenteredWrapper";
import Title from "components/Title";

import template from "./Error.hbs";

type Props = {
  code: string | number;
  message: string;
};

class ErrorComponent extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init(): void {
    this.children.title = new Title({
      text: this.props.code.toString(),
      size: "xl",
    });
    this.children.button = new Button({
      id: "error-page-btn",
      variant: "link",
      text: "Вернуться к чатам",
      onClick: () => {
        Router.go(PAGE_URL.MESSENGER);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const ErrorPage = (props: Props) =>
  new CenteredWrapper({ content: new ErrorComponent(props) });

export default ErrorPage;
