import template from "./title.hbs";

const Title = ({ id, text, size, color }) => {
  return template({
    id,
    text,
    size,
    color,
  });
};

export default Title;
