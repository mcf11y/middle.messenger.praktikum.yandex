import template from "./authForm.hbs";

type Props = {
  title: HbsNode;
  contentItems: HbsNode[];
  submitBtn: HbsNode;
  redirectBtn: HbsNode;
  actionUrl?: string;
};

const AuthForm = ({
  title,
  contentItems,
  submitBtn,
  redirectBtn,
  actionUrl,
}: Props) =>
  template({
    title,
    contentItems,
    submitBtn,
    redirectBtn,
    actionUrl,
  });

export default AuthForm;
