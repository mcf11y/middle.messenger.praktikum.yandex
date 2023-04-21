import template from "./label.hbs";

const Label = ({ id, forId, text }) => {
  return template({
    id,
    forId,
    text,
  });
};

export default Label;
