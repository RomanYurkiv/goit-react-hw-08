import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { searchContact } from "../../redux/contacts/operations";
import TextField from "@mui/material/TextField";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(searchContact(value));
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.searchContainer}>
      <label htmlFor="search">Find contacts:</label>
      <TextField
        className={css.searchInput}
        variant="outlined"
        id="search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBox;
