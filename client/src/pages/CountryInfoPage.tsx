import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryInfo } from "../services/api";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemButton,
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import { PopulationChart } from "@components/Charts/PopulationChart";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";
import {
  Body1Typography,
  H2Typography,
} from "@components/Typography/Typography";
import { TBorderCountry, TCountryInfo } from "@utils/types/types";

export const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState<TCountryInfo | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (countryCode) {
      getCountryInfo(countryCode).then(setCountryInfo);
    }
  }, [countryCode]);

  if (!countryInfo)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      {/* Centering the country name */}
      <H2Typography align="center">{countryInfo.countryName}</H2Typography>
      <FlexBox padding={4}>
        <img
          src={countryInfo.flag}
          alt={`Flag of ${countryInfo.countryName}`}
          width={320}
          style={{
            display: "flex",
            margin: "0",
            padding: "0",
            borderRadius: "8px", // Add this line for border radius
          }}
        />
      </FlexBox>

      <TableContainer sx={{ marginBottom: "4rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
              >
                Border Countries
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryInfo.borders && countryInfo.borders.length > 0 ? (
              countryInfo.borders.map((border: TBorderCountry) => (
                <TableRow key={border.countryCode}>
                  <TableCell sx={{ padding: 0 }}>
                    <ListItemButton
                      onClick={() => navigate(`/country/${border.countryCode}`)}
                    >
                      <Body1Typography>{border.commonName}</Body1Typography>
                    </ListItemButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No bordering countries</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PopulationChart populationData={countryInfo.population} />
    </Container>
  );
};
