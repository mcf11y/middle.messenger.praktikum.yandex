import Title from "../../../../components/title";

import template from "./profileForm.hbs";

interface Props {
  avatar: HbsNode;
  userName: None<string>;
  contentFields: HbsNode[];
  footerFields: HbsNode[];
}

const ProfileForm = ({
  avatar,
  userName,
  contentFields,
  footerFields,
}: Props) =>
  template({
    avatar,
    title: userName && Title({ text: userName, size: "m" }),
    contentFields,
    footerFields,
  });

export default ProfileForm;
