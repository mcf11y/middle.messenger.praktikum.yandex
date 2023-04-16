import template from "./centeredWrapper.hbs";
import * as styles from "./centeredWrapper.module.scss";

const CenteredLayout = ({ content }) => {
  return template({
    content,
    styles,
  });
};

export default CenteredLayout;
