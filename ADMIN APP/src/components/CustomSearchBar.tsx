type CustomSearchBarProps = {
  searchQuery: string;
  placeholder: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomSearchBar(parameters: CustomSearchBarProps) {
  return (
    <input
      type = "text"
      value = {parameters.searchQuery}
      onChange = {parameters.handleInputChange}
      placeholder = {parameters.placeholder}
    />
  );
}
