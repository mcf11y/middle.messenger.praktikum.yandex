import Divider from "../divider";

import template from "./customField.hbs";

interface Props {
  leftField?: HbsNode;
  rightField?: HbsNode;
  divider?: boolean;
}

const CustomField = ({ leftField, rightField, divider = true }: Props) =>
  template({
    leftField,
    rightField,
    divider: divider && Divider(),
  });

export default CustomField;
