import LeftBar from "./components/leftBar";
import ProfileForm from "./components/profileForm";
import CenteredWrapper from "../../components/centeredWrapper";

import template from "./profile.hbs";

interface Props {
  avatar: string;
  userName?: string;
  contentFields: HbsNode[];
  footerFields: HbsNode[];
}

const Profile = ({ avatar, userName, contentFields, footerFields }: Props) => {
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
