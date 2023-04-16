import template from "./authForm.hbs";
import * as styles from "./authForm.module.scss";

const AuthForm = ({ title, content, submitBtn, redirectBtn, actionUrl }) => {
  return template({
    title,
    content,
    submitBtn,
    redirectBtn,
    actionUrl,
    styles,
  });
};

export default AuthForm;
