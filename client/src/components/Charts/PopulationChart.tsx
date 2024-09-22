import React, { useMemo } from "react";
import { Body2Typography } from "@components/Typography/Typography";
import { Paper, styled, useTheme } from "@mui/material";
import { MEDIA_BREAKPOINT } from "@utils/constants/media.constants";
import { ThemeModeEnum } from "@utils/enums/theme";
import { AreaChart, XAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
import { TPopulationData } from "@utils/types/types";

const Container = styled(Paper)`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 400px;
  min-height: 150px;
  gap: 0;
  flex-grow: 1;
  border-radius: 12px;
  overflow: hidden;

  @media ${MEDIA_BREAKPOINT["1024"]} {
    min-height: 100px;
    min-width: 340px;
  }

  @media ${MEDIA_BREAKPOINT["768"]} {
    min-height: 100px;
    min-width: 360px;
  }

  @media ${MEDIA_BREAKPOINT["480"]} {
    min-height: 100px;
    min-width: 228px;
  }
  @media ${MEDIA_BREAKPOINT["320"]} {
    min-height: 100px;
    min-width: 304px;
  }
`;

export const PopulationChart = ({
  populationData,
}: {
  populationData: TPopulationData;
}) => {
  const theme = useTheme();
  const areaColor = useMemo(
    () =>
      theme.palette.mode === ThemeModeEnum.DARK
        ? theme.palette.text.secondary
        : theme.palette.text.secondary,
    [theme]
  );
  return (
    <Container elevation={0} sx={{ padding: "1rem 8px" }}>
      <Body2Typography
        color="text.secondary"
        fontWeight={700}
        sx={{ paddingLeft: "1rem" }}
      >
        Population
      </Body2Typography>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={populationData}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="90%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="linear"
            dataKey="value"
            fillOpacity={1}
            stroke={areaColor}
            fill={"url(#colorValue)"}
            strokeWidth={3}
            opacity={0.5}
          />
          <XAxis dataKey="year" />
          <Tooltip
            cursor={false}
            formatter={(value) => [value.toLocaleString(), "Population"]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          {/* <Legend /> */}
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};
