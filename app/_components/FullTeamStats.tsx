import { Box, Typography, Divider, TableFooter } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { JSX } from "react";

export default function FullTeamStats({ data }: { data: any }) {
  const view = () => {
    const els: JSX.Element[] = [];
    Object.entries(data.fullTeamStats).map(([key, value]: [string, any]) =>
      els.push(
        <table key={uuidv4()} className="table stat-table border-collapse">
          <thead>
            <tr className="table-header">
              <th className="table-header uppercase" colSpan={2} align="left">
                {key}
              </th>
              <th className="table-header w-[5rem]" align="right">
                <Box className="flex flex-row items-center gap-1 justify-end">
                  <Image
                    src={data.teamData.team.logos[0].href}
                    width={data.teamData.team.logos[0].width}
                    height={data.teamData.team.logos[0].height}
                    alt=""
                    className="w-5 object-contain"
                  />
                  {data.teamData.team.abbreviation}
                </Box>
              </th>
              <th className="table-header w-[6rem]" align="right">
                Rank
              </th>
            </tr>
          </thead>
          <tbody>
            {value.map((stat: any) => (
              <tr key={uuidv4()}>
                <td className="text-xs t-table-cell" align="left" colSpan={2}>
                  {stat.displayName}
                </td>
                <td className="text-xs t-table-cell" align="right">
                  {stat.displayValue}
                </td>
                <td className="text-xs t-table-cell" align="right">
                  {stat.rankDisplayValue ? stat.rankDisplayValue.replaceAll("Tied", "T") : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
    return els;
  };
  return (
    <Box className="w-full bg-white rounded-xl p-3">
      <Typography className="text-xl md:text-2xl font-semibold mb-4 opacity-90">
        {data.teamData.team.displayName} 2023 Statistics
      </Typography>
      {view()}
    </Box>
  );
}
