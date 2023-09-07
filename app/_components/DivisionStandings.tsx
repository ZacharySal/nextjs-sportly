import {
  Box,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function DivisionStandings({ data }: { data: any }) {
  return data.gameData.standings.groups.map((group: any) => {
    <Box
      key={uuidv4()}
      className="w-full bg-white rounded-xl drop-shadow-md p-3"
    >
      <Typography className="font-semibold opacity-70 text-sm">
        {group.header}
      </Typography>

      <TableContainer
        style={{ maxWidth: "100%", marginTop: "0.5rem" }}
        component={Box}
      >
        <Table aria-label="simple table" size="small">
          <TableHead
            sx={{
              borderTop: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <TableRow>
              <TableCell
                className=" text-sm font-semibold"
                align="left"
                style={{ width: "6rem" }}
              >
                Team
              </TableCell>
              <TableCell
                className=" text-sm font-semibold"
                style={{ width: "4rem" }}
                align="center"
              >
                W
              </TableCell>
              <TableCell
                className=" text-sm font-semibold"
                style={{ width: "4rem" }}
                align="center"
              >
                L
              </TableCell>
              <TableCell
                style={{ fontStyle: "bold", width: "4rem" }}
                className=" text-sm font-semibold"
                align="center"
              >
                WP
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.standings.entries.map((team: any) => (
              <TableRow
                key={uuidv4()}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-child(odd) td, &:nth-child(odd) th": {
                    backgroundColor: "#edeef0;",
                  },
                }}
              >
                <TableCell
                  className="text-xs"
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                >
                  {team.team}
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                  align="center"
                >
                  {team.stats[4].displayValue}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                  align="center"
                >
                  {team.stats[1].displayValue}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                  align="center"
                >
                  {team.stats[3].displayValue}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>;
  });
}
