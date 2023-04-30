import template from "./button.hbs";

type Props = {
	id?: string;
	variant: "primary" | "secondary" | "link";
	type?: "submit" | "reset" | "button";
	text: string;
	disabled?: boolean;
	startIconSrc?: string;
	endIconSrc?: string;
	width?: number;
};

const Button = ({
  id,
  variant = "primary",
  type,
  text,
  disabled = false,
  startIconSrc,
  endIconSrc,
  width,
}: Props) => template({
  id,
  variant,
  type,
  text,
  disabled,
  withIcon: startIconSrc || endIconSrc,
  startIconSrc,
  endIconSrc,
  width,
});

export default Button;
