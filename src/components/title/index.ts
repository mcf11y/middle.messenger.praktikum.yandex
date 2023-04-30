import template from "./title.hbs";

type Props = {
  id?: string;
  text: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: "gray";
};

const Title = ({ id, text, size, color }: Props) =>
  template({
    id,
    text,
    size,
    color,
  });

export default Title;
