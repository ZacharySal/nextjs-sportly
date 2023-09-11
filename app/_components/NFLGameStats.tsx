import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function NFLGameStats({ data }: { data: any }) {
  const content = (
    <>
      <Box className="grid grid-cols-2 gap-x-2">
        {data.gameData.boxscore.players.map((players: any) => (
          <Box>
            {players.statistics.map((statType: any) => (
              <TableContainer
                style={{ width: "100%", marginTop: "0.5rem", backgroundColor: "white" }}
                className="rounded-xl p-3"
                component={Box}
              >
                <Typography>{statType.text}</Typography>
                <TableHead
                  sx={{
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <TableRow>
                    <TableCell className=" text-sm font-semibold" align="center">
                      Name
                    </TableCell>
                    {statType.labels.map((label: string) => (
                      <TableCell className=" text-sm font-semibold" align="center">
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statType.athletes.map((athlete: any) => (
                    <>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:nth-child(odd) td, &:nth-child(odd) th": {
                            backgroundColor: "#edeef0;",
                          },
                        }}
                      >
                        <TableCell className=" text-sm font-semibold" align="center">
                          {athlete.athlete.displayName || ""}
                        </TableCell>
                        {athlete.stats.map((stat: any) => (
                          <TableCell className=" text-sm font-semibold" align="center">
                            {stat}
                          </TableCell>
                        ))}
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </TableContainer>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
  return <>{content}</>;
}
