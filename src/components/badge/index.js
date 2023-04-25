import template from "./badge.hbs";

const Badge = ({ id, size, text }) => {
  if (!text) {
    return;
  }

  return template({
    id,
    text,
  });
};

export default Badge;
