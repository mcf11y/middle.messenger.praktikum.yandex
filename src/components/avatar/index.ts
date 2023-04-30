import template from "./avatar.hbs";

type Props = {
	id?: string;
	size?: "s" | "m" | "l";
	imageSrc?: string | HTMLImageElement;
};

const Avatar = ({id, size, imageSrc}: Props) => template({
  id,
  size,
  imageSrc,
});

export default Avatar;
