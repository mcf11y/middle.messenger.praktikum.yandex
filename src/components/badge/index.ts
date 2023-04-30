import template from "./badge.hbs";

type Props = {
	id?: string;
	size?: number;
	text: string | number;
};

const Badge = ({id, text}: Props) => template({
  id,
  text,
});

export default Badge;
