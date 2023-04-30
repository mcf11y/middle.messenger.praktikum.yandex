import template from "./label.hbs";

type Props = {
	id?: string;
	forId?: string;
	text: string;
	isBlack?: boolean;
};

const Label = ({
  id, forId, text, isBlack = false,
}: Props) => template({
  id,
  forId,
  text,
  isBlack,
});

export default Label;
