import template from "./searchInput.hbs";

type Props = {
  input: HbsNode;
};

const SearchInput = ({ input }: Props) =>
  template({
    input,
  });

export default SearchInput;
