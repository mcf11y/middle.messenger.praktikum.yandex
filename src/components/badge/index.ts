import template from "./badge.hbs";

interface Props {
  id?: string;
  size?: number;
  text: string | number;
}

const Badge = ({ id, text }: Props) => {
  return template({
    id,
    text,
  });
};

export default Badge;
