import template from "./field.hbs";

type Props = {
  label: HbsNode;
  input: HbsNode;
  style?: any;
};

const Field = ({ label, input, style }: Props) =>
  template({
    label,
    input,
    style,
  });

export default Field;
