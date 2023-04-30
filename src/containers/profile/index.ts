import CenteredWrapper from "components/centeredWrapper";
import LeftBar from "./components/leftBar";
import template from "./profile.hbs";
import ProfileForm from "./components/profileForm";

type Props = {
  avatar: string;
  userName?: string;
  contentFields: HbsNode[];
  footerFields: HbsNode[];
};

const Profile = ({ avatar, userName, contentFields, footerFields }: Props) =>
  template({
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

export default Profile;
