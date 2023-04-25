import Divider from "../divider";

import template from "./customField.hbs";

const CustomField = ({ leftField, rightField, divider = true }) =>
  template({
    leftField,
    rightField,
    divider: divider && Divider(),
  });

export default CustomField;
