import React from "react";
import { Pagination } from "@mui/material";

interface PaginationBarProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  color?: "primary" | "secondary" | "standard";
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  count,
  onChange,
  color = "primary",
}) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      color={color}
    />
  );
};

export default PaginationBar;