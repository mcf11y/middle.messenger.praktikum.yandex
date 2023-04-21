import template from "./authForm.hbs";

const AuthForm = ({ title, contentItems, submitBtn, redirectBtn, actionUrl }) =>
  template({
    title,
    contentItems,
    submitBtn,
    redirectBtn,
    actionUrl,
  });

export default AuthForm;
