import Block from "services/block";

import Button from "components/Button";

import template from "./AvatarFormInput.hbs";

type Props = {
  onSubmit: (e: SubmitEvent) => void;
};

class AvatarFormInput extends Block<Props> {
  protected init() {
    this.children.submitBtn = new Button({
      text: "Поменять",
      type: "submit",
    });

    this.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        this.props?.onSubmit?.(e);
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AvatarFormInput;
