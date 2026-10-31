import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;

    setValue(text);

    if (text.trim()) {
      navigate(`/search?q=${encodeURIComponent(text)}`);
    }
  };

  return (
    <TextField
      fullWidth
      placeholder="Search groceries..."
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
