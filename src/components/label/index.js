import template from "./label.hbs";

const Label = ({ id, forId, text, black }) => {
  return template({
    id,
    forId,
    text,
    black,
  });
};

export default Label;
