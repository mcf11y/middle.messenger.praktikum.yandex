import template from "./centeredWrapper.hbs";

type Props = {
	content: HbsNode;
};

const CenteredWrapper = ({content}: Props) => template({content});

export default CenteredWrapper;
