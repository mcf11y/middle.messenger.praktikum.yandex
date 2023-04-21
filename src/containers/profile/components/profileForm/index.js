import Title from "../../../../components/title";

import template from "./ProfileForm.hbs";

const ProfileForm = ({ avatar, userName, contentFields, footerFields }) =>
  template({
    avatar,
    title: userName && Title({ text: userName, size: "m" }),
    contentFields,
    footerFields,
  });

export default ProfileForm;
