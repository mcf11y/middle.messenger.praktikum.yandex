import Block from "services/block";

import IconButton from "components/IconButton";

import template from "./Dropdown.hbs";

interface Props {
  iconSrc: string;
  items: Block[];
}

type BlockProps = Props & { open?: boolean };

class Dropdown extends Block<BlockProps> {
  public hideDropdown() {
    this.setProps({
      open: false,
    });
  }

  public showDropdown() {
    this.setProps({
      open: true,
    });
  }

  protected init(): void {
    this.children.iconBtn = new IconButton({
      iconSrc: this.props.iconSrc,
      variant: "secondary",
      btnWidth: 30,
      iconWidth: 4,

      onClick: () => {
        if (this.props.open) {
          this.hideDropdown();
        } else {
          this.showDropdown();
        }
      },
    });
  }

  protected componentDidUpdate() {
    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Dropdown;
