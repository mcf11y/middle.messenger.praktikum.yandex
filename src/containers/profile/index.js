import LeftBar from "./components/leftBar";
import ProfileForm from "./components/profileForm";
import CenteredWrapper from "../../components/centeredWrapper";

import template from "./profile.hbs";

const Profile = ({ avatar, userName, contentFields, footerFields }) => {
  return template({
    leftBar: LeftBar(),

    profileForm: CenteredWrapper({
      content: ProfileForm({
        avatar,
        userName,
        contentFields,
        footerFields,
      }),
    }),
  });
};

export default Profile;
