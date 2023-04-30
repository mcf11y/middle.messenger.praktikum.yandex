import template from "./centeredWrapper.hbs";

interface Props {
  content: HbsNode;
}

const CenteredWrapper = ({ content }: Props) => template({ content });

export default CenteredWrapper;
