import { Box, Typography } from "@mui/material";
import Image from "next/image";

function getRGB(color: string) {
  let parsedColor = parseInt(color.substring(1), 16);
  let r = parsedColor >> 16;
  let g = (parsedColor - (r << 16)) >> 8;
  let b = parsedColor - (r << 16) - (g << 8);
  return [r, g, b];
}

function isSimilar([r1, g1, b1]: any, [r2, g2, b2]: any) {
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 100;
}

export default function MatchupPredictor({ data, league }: { data: any; league: string }) {
  const awayTeamChance = (Number(data.gameData.predictor.awayTeam.gameProjection) * 360) / 100;

  const homeTeamColor = data.homeTeam.team.color;
  let awayTeamColor = isSimilar(getRGB(`#${homeTeamColor}`), getRGB(`#${data.awayTeam.team.color}`))
    ? data.awayTeam.team.alternateColor
    : data.awayTeam.team.color;

  const [losingTeamColor, winningTeamColor] =
    awayTeamChance > 180 ? [awayTeamColor, homeTeamColor] : [homeTeamColor, awayTeamColor];

  isSimilar(getRGB(`#${losingTeamColor}`), getRGB(`#${winningTeamColor}`));

  return (
    <Box className="w-full bg-white rounded-xl p-3">
      <Typography className="font-semibold opacity-70 text-sm">Matchup Predictor</Typography>
      <Box
        className="matchup-predictor w-full bg-white rounded-xl p-2 flex justify-center items-center"
        data-awayteamchance={Math.floor(data.gameData.predictor.awayTeam.gameProjection) + "%"}
        data-hometeamchance={
          Math.floor(100 - data.gameData.predictor.awayTeam.gameProjection) + "%"
        }
      >
        <div
          style={{
            backgroundColor: `#${winningTeamColor}`,
            backgroundImage: `linear-gradient(${
              360 - awayTeamChance
            }deg, transparent 50%, #${losingTeamColor} 50%), linear-gradient(0deg, #${losingTeamColor} 50%, transparent 50%)`,
          }}
          className="circle-border"
        >
          <div className="circle">
            <Image
              width={100}
              height={100}
              alt="home team"
              className="matchup-image-home w-10 object-contain"
              src={`/${league}/${data.homeTeam.team.name.replaceAll(" ", "").toLowerCase()}.png`}
            />
            <Image
              width={100}
              height={100}
              alt="away team"
              className="matchup-image-away w-10 object-contain"
              src={`/${league}/${data.awayTeam.team.name.replaceAll(" ", "").toLowerCase()}.png`}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
}
