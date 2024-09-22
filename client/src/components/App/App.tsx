import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  PageContainer,
  PageWrapper,
} from "@styles/StyledComponents/Containers";
// import { H1Typography } from "@components/Typography/Typography";
import { AppProvider } from "./AppProvider";
import { CountryListPage } from "@pages/CountryListPage";
import { CountryInfoPage } from "@pages/CountryInfoPage";
import { PageHeader } from "@components/Header/PageHeader ";

export function App(): React.ReactNode {
  return (
    <AppProvider>
      <Router>
        <PageContainer>
          <PageWrapper>
            <PageHeader />
            <Routes>
              <Route path="/" element={<CountryListPage />} />
              <Route
                path="/country/:countryCode"
                element={<CountryInfoPage />}
              />
              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
          </PageWrapper>
        </PageContainer>
      </Router>
    </AppProvider>
  );
}
