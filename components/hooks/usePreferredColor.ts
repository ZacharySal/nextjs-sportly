function getRGB(color: string) {
  let parsedColor = parseInt(color.substring(1), 16);
  let r = parsedColor >> 16;
  let g = (parsedColor - (r << 16)) >> 8;
  let b = parsedColor - (r << 16) - (g << 8);
  return [r, g, b];
}

function isSimilar([r1, g1, b1]: any, [r2, g2, b2]: any) {
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 60;
}

export default function usePreferredColor(data: any) {
  const potentialColorCombos = [
    {
      homeTeamColor: data.homeTeam.team.color,
      awayTeamColor: data.awayTeam.team.color,
    },
    {
      homeTeamColor: data.homeTeam.team.color,
      awayTeamColor: data.awayTeam.team.alternateColor,
    },
    {
      homeTeamColor: data.homeTeam.team.alternateColor,
      awayTeamColor: data.awayTeam.team.color,
    },
    {
      homeTeamColor: data.homeTeam.team.alternateColor,
      awayTeamColor: data.awayTeam.team.alternateColor,
    },
  ];

  const { homeTeamColor, awayTeamColor } = potentialColorCombos
    .map((el: any) => el)
    .find(
      (combo: any) =>
        !isSimilar(getRGB(combo.homeTeamColor), getRGB(combo.awayTeamColor)),
    );

  return { homeTeamColor, awayTeamColor };
}
