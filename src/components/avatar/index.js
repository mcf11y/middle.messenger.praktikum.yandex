import template from "./avatar.hbs";

const Avatar = ({ id, size, image }) =>
  template({
    id,
    size,
    image,
  });

export default Avatar;
