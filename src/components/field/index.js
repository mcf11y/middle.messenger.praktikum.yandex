import template from "./field.hbs";

const Field = ({ label, input }) =>
  template({
    label,
    input,
  });

export default Field;
