import Block from "services/block";

import Button from "components/Button";

import template from "./AvatarFormInput.hbs";

type Props = {
  onSubmit: () => void;
};

class AvatarFormInput extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected init() {
    this.children.submitBtn = new Button({
      text: "Поменять",
      type: "submit",
    });

    this.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        this.props?.onSubmit?.();
      },
    };
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default AvatarFormInput;
