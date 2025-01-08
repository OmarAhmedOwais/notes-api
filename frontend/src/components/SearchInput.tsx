import React from "react";
import { TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;