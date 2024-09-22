import React, { useEffect, useState } from "react";
import { getAvailableCountries } from "../services/api";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ListItemButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Body1Typography } from "@components/Typography/Typography";
import SearchIcon from "@mui/icons-material/Search"; // Import search icon

interface Country {
  countryCode: string;
  name: string;
}

export const CountryListPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getAvailableCountries().then(setCountries);
  }, []);

  // Filter countries based on the entered text
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered countries alphabetically
  const sortedCountries = filteredCountries.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Container>
      {/* Search field with an icon */}
      <TextField
        fullWidth
        label="Search for a country"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
        sx={{ margin: "2rem 0" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
              >
                Country Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCountries.map((country) => (
              <TableRow key={country.countryCode}>
                <TableCell sx={{ padding: 0 }}>
                  <ListItemButton
                    onClick={() => navigate(`/country/${country.countryCode}`)}
                  >
                    <Body1Typography>{country.name}</Body1Typography>
                  </ListItemButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
