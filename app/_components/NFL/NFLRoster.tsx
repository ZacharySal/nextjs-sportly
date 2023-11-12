import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function NFLRoster({ data }: { data: any }) {
  return (
    <Box className="w-full bg-white p-3 rounded-xl">
      <Typography className="text-xl md:text-2xl font-semibold mb-4 opacity-90">
        {data.team.displayName} Team Roster 2023
      </Typography>
      {data.athletes.map((category: any) => (
        <>
          <Typography className="capitalize opacity-60 font-[600] tracking-wide md:text-lg mb-2">
            {category.position}
          </Typography>
          <Box className="w-full flex justify-center overflow-hidden mb-2">
            <table className="border-collpase">
              <thead className="table-fixed-left-thead table-header">
                <tr className="table-header">
                  <th className="uppercase pl-2" align="left">
                    Name
                  </th>
                </tr>
                {category.items.map((athlete: any) => (
                  <tr key={uuidv4()} className="team-info-cell">
                    <td className="flex flex-row items-center gap-1 pl-2">
                      <Typography className="text-xs text-[#3e82d6]">{athlete.fullName}</Typography>
                      <Typography className="text-[10px] text-black opacity-50">
                        ({athlete.jersey})
                      </Typography>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
            <Box className="w-full overflow-x-auto">
              <table className="table standings-table">
                <thead>
                  <tr className="table-header">
                    <th align="center">POS</th>
                    <th align="center">AGE</th>
                    <th align="center">HT</th>
                    <th align="center">WT</th>
                    <th align="center">EXP</th>
                    <th align="left">COLLEGE</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((athlete: any) => (
                    <tr key={uuidv4()} className="team-info-cell">
                      <td className="table-cell" align="center">
                        {athlete.position.abbreviation}
                      </td>
                      <td className="table-cell" align="center">
                        {athlete.age}
                      </td>
                      <td className="table-cell" align="center">
                        {athlete.displayHeight}
                      </td>
                      <td className="table-cell" align="center">
                        {athlete.displayWeight}
                      </td>
                      <td className="table-cell" align="center">
                        {athlete.experience.years}
                      </td>
                      <td className="table-cell" align="left">
                        {athlete?.college?.name || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </>
      ))}
    </Box>
  );
}
