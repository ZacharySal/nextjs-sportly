import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

// NFL win / loss stats are shaped differently

export default function DivisionStandings({
  data,
  isNFL = false,
  league,
}: {
  data: any;
  isNFL: boolean;
  league: string;
}) {
  function getWins(team: any) {
    return isNFL ? team.stats[5].displayValue : team.stats[4].displayValue;
  }
  function getLosses(team: any) {
    return isNFL ? team.stats[0].displayValue : team.stats[1].displayValue;
  }
  function getWinPercentage(team: any) {
    return isNFL ? team.stats[4].displayValue : team.stats[3].displayValue;
  }

  const isMatchingTeam = (name: string) =>
    data.homeTeam.team.location.includes(name) || data.awayTeam.team.location.includes(name);

  return data.gameData.standings.groups.map((group: any) => (
    <div key={uuidv4()} className="w-full bg-white rounded-xl p-3">
      <p className="font-semibold text-sm mb-2">{group.header}</p>

      <table className="misc-table table min-w-full">
        <thead className="table-header">
          <tr className="table-header">
            <th align="left" className="table-header pl-2">
              TEAM
            </th>
            <th className="" align="center">
              W
            </th>
            <th className="table-header" align="center">
              L
            </th>
            <th className="table-header" align="center">
              WP
            </th>
          </tr>
        </thead>
        <tbody>
          {group.standings.entries.map((team: any) => (
            <tr key={uuidv4()} className="w-full">
              <td
                style={{
                  fontWeight: isMatchingTeam(team.team) ? "700" : "400",
                  color: isMatchingTeam(team.team) ? "black" : "#6c6d6f",
                }}
                className="text-xs p-1"
                align="left"
              >
                <Link
                  href={`/${league}/team/${team.id}/home`}
                  className="whitespace-nowrap anchor-link"
                >
                  {team.team}
                </Link>
              </td>
              <td
                style={{
                  fontWeight: isMatchingTeam(team.team) ? "700" : "400",
                  color: isMatchingTeam(team.team) ? "black" : "#6c6d6f",
                }}
                className="text-xs table-cell"
                align="center"
              >
                {getWins(team)}
              </td>
              <td
                style={{
                  fontWeight: isMatchingTeam(team.team) ? "700" : "400",
                  color: isMatchingTeam(team.team) ? "black" : "#6c6d6f",
                }}
                className="text-xs table-cell"
                align="center"
              >
                {getLosses(team)}
              </td>
              <td
                style={{
                  fontWeight: isMatchingTeam(team.team) ? "700" : "400",
                  color: isMatchingTeam(team.team) ? "black" : "#6c6d6f",
                }}
                className="text-xs table-cell"
                align="center"
              >
                {getWinPercentage(team)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <TableContainer style={{ maxWidth: "100%", marginTop: "0.5rem" }} component={Box}>
        <Table aria-label="simple table" size="small">
          <TableHead
            style={{
              borderTop: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <TableRow>
              <TableCell className=" text-sm font-semibold" align="left" style={{ width: "6rem" }}>
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
              <TableRow key={uuidv4()}>
                <TableCell
                  className="text-xs"
                  component="th"
                  scope="row"
                  style={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                    color: "#06c",
                    cursor: "pointer",
                  }}
                >
                  <Link href={`/${league}/team/${team.id}/home`} className="whitespace-nowrap">
                    {team.team}
                  </Link>
                </TableCell>

                <TableCell
                  style={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                  align="center"
                >
                  {getWins(team)}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                  align="center"
                >
                  {getLosses(team)}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight:
                      data.homeTeam.team.location.includes(team.team) ||
                      data.awayTeam.team.location.includes(team.team)
                        ? "700"
                        : "400",
                  }}
                  align="center"
                >
                  {getWinPercentage(team)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  ));
}
