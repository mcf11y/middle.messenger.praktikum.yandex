import template from "./label.hbs";

interface Props {
  id?: string;
  forId?: string;
  text: string;
  isBlack?: boolean;
}

const Label = ({ id, forId, text, isBlack = false }: Props) => {
  return template({
    id,
    forId,
    text,
    isBlack,
  });
};

export default Label;
