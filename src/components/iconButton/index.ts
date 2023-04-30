import template from "./iconButton.hbs";

interface Props {
  id?: string;
  variant?: "primary" | "secondary";
  iconSrc: string;
  disabled?: boolean;
  btnWidth?: number;
  iconWidth?: number;
}

const IconButton = ({
  id,
  variant = "primary",
  iconSrc,
  disabled = false,
  btnWidth,
  iconWidth,
}: Props) =>
  template({
    id,
    iconSrc,
    variant,
    btnWidth,
    iconWidth,
    disabled,
  });

export default IconButton;
