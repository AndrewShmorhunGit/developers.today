import React from "react";

import { ThemeToggleButton } from "@components/Theme/ThemeToggleButton";
import { PaperHeaderContainer } from "@styles/StyledComponents/Containers";
import { MainLogo } from "@components/Logos/MainLogo";

export function PageHeader(): React.ReactNode {
  return (
    <PaperHeaderContainer sx={{ borderBottom: "1px solid" }}>
      <MainLogo />
      <ThemeToggleButton />
    </PaperHeaderContainer>
  );
}
