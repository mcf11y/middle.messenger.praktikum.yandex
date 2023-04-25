import IconButton from "../../../../components/iconButton";

import BackIcon from "../../../../../static/icons/arrow-left.svg";

import template from "./leftBar.hbs";

const LeftBar = () => template({ backButton: IconButton({ icon: BackIcon }) });

export default LeftBar;
