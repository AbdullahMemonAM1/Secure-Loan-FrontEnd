import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../../src/Components/Navbar";
import SearchCard from "../../src/Components/SearchCard";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchType, setSearchType] = useState("interestRate"); // Default search type
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    // Set loading to true before making the request
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3002/packages/borrower/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchType: searchType,
            searchValue: searchValue,
            role: userRole,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error searching for packages:", error);
    } finally {
      // Set loading to false after receiving the response
      setLoading(false);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    setUserRole(userData.status);
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ margin: 100, justifyContent: "center", marginTop: 50 }}>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Search by:</FormLabel>
            <RadioGroup
              row
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <FormControlLabel
                value="interestRate"
                control={<Radio />}
                label="Interest Rate"
              />
              <FormControlLabel
                value="amount"
                control={<Radio />}
                label="Total Amount"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            size="large"
            placeholder="Search..."
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
              sx: {
                borderRadius: 30, // Rounded corners
                height: 60, // Increase height of search bar
                width: "100%", // Dynamically adjust width based on search results
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            size="large"
            style={{ marginTop: 20 }}
          >
            Search
          </Button>
          {loading && (
            <center>
              <CircularProgress style={{ marginTop: 20 }} />
            </center>
          )}
          {!loading && searchResults.length === 0 && (
            <center>
              <br />
              <p>No results found</p>
            </center>
          )}
          {!loading && searchResults.length > 0 && (
            <center><div
              style={{
                
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              {searchResults.map((result, index) => (
                <Link
                  to={
                    userRole === "Borrower"
                      ? `/loaninfo/${result.id}`
                      : `/Lenderloaninfo/${result.id}`
                  }
                  target="_blank"
                >
                  <SearchCard key={index} data={result} role={userRole} />
                </Link>
              ))}
            </div></center>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
