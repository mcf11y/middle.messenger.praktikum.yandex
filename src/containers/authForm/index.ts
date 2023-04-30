import template from "./authForm.hbs";

interface Props {
  title: HbsNode;
  contentItems: HbsNode[];
  submitBtn: HbsNode;
  redirectBtn: HbsNode;
  actionUrl?: string;
}

const AuthForm = ({
  title,
  contentItems,
  submitBtn,
  redirectBtn,
  actionUrl,
}: Props) => {
  return template({
    title,
    contentItems,
    submitBtn,
    redirectBtn,
    actionUrl,
  });
};

export default AuthForm;
