import template from "./iconButton.hbs";

const IconButton = ({ id, variant = 'primary', icon, disabled = false, btnWidth, iconWidth }) =>
  template({
    id,
    icon,
    variant,
    btnWidth,
    iconWidth,
    disabled,
  });

export default IconButton;
