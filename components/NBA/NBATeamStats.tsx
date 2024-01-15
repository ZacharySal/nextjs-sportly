import Image from "next/image";

function getRGB(color: string) {
  let parsedColor = parseInt(color.substring(1), 16);
  let r = parsedColor >> 16;
  let g = (parsedColor - (r << 16)) >> 8;
  let b = parsedColor - (r << 16) - (g << 8);
  return [r, g, b];
}

function isSimilar([r1, g1, b1]: any, [r2, g2, b2]: any) {
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 80;
}

export default function NBATeamStats({ data }: { data: any }) {
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
    .find((combo: any) => !isSimilar(getRGB(combo.homeTeamColor), getRGB(combo.awayTeamColor)));

  function getTeamStatDisplay(
    teamOption: number,
    statOption: number,
    color: string,
    homeTeam: boolean
  ) {
    const statName = data.gameData?.boxscore?.teams?.[teamOption].statistics?.[statOption]?.name;
    return (
      <div
        style={{ paddingRight: homeTeam ? "0px" : "10px", paddingLeft: homeTeam ? "10px" : "0px" }}
        className="flex flex-col py-2 border-dotted border-b border-[rgba(0,0,0,0.2)]"
      >
        <p className="font-bold text-lg">
          {data.gameData?.boxscore?.teams?.[teamOption].statistics?.[statOption]?.displayValue}
        </p>
        <div className="w-full h-[10px] bg-gray-300 rounded-3xl relative">
          <div className="absolute w-[1px] opacity-40 h-[10px] bg-gray-100 left-[25%] z-20"></div>
          <div className="absolute w-[1px] opacity-40 h-[10px] bg-gray-100 left-[50%] z-20"></div>
          <div className="absolute w-[1px] opacity-40 h-[10px] bg-gray-100 left-[75%] z-20"></div>
          <div
            style={{
              width:
                statName === "turnovers" || statName === "totalRebounds"
                  ? `${
                      (data.gameData?.boxscore?.teams?.[teamOption]?.statistics?.[statOption]
                        ?.displayValue /
                        Math.max(
                          data.gameData?.boxscore?.teams?.[0].statistics?.[statOption]
                            ?.displayValue,
                          data.gameData?.boxscore?.teams?.[1].statistics?.[statOption]?.displayValue
                        )) *
                      100
                    }%`
                  : `${data.gameData?.boxscore?.teams?.[teamOption]?.statistics?.[statOption]?.displayValue}%`,
              backgroundColor: `#${color}`,
            }}
            className="absolute left-0  h-[10px] rounded-3xl"
          ></div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-w-full bg-white p-3 rounded-md">
      <h3 className="font-semibold text-[14px] pb-2 border-b border-b-[rgba(0,0,0,0.2)] border-dotted">
        Team Stats
      </h3>
      <div className="grid grid-cols-[2fr_1fr_2fr] py-2 border-b border-b-[rgba(0,0,0,0.2)] border-dotted">
        <div className="flex gap-1 items-center">
          <Image
            src={data.awayTeam.team.logos[0].href}
            alt={data.awayTeam.team.logos[0].alt}
            width={data.awayTeam.team.logos[0].width}
            height={data.awayTeam.team.logos[0].height}
            className="w-6 object-contain"
          />
          <h4 className="text-[12px] font-semibold">{data.awayTeam.team.abbreviation}</h4>
        </div>
        <div className="flex gap-1 col-start-3 items-center">
          <Image
            src={data.homeTeam.team.logos[0].href}
            alt={data.homeTeam.team.logos[0].alt}
            width={data.homeTeam.team.logos[0].width}
            height={data.homeTeam.team.logos[0].height}
            className="w-6 object-contain"
          />
          <h4 className="text-[12px] font-semibold">{data.homeTeam.team.abbreviation}</h4>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_65px_2fr] grid-rows-[55px_55px_55px_55px]">
        {getTeamStatDisplay(0, 1, awayTeamColor, false)}
        <p className="text-[10px] text-[rgba(0,0,0,0.6)] font-semibold w-full text-center border-l border-r border-dotted border-b p-2 border-[rgba(0,0,0,0.2)] flex justify-center items-center">
          Field Goal %
        </p>
        {getTeamStatDisplay(1, 1, homeTeamColor, true)}
        {getTeamStatDisplay(0, 3, awayTeamColor, false)}
        <p className="text-[10px] text-[rgba(0,0,0,0.6)] font-semibold w-full text-center border-l border-r border-dotted border-b  p-2 border-[rgba(0,0,0,0.2)] flex justify-center items-center">
          Three Point %
        </p>
        {getTeamStatDisplay(1, 3, homeTeamColor, true)}
        {getTeamStatDisplay(0, 12, awayTeamColor, false)}
        <p className="text-[10px] text-[rgba(0,0,0,0.6)] font-semibold w-full text-center border-l border-r border-dotted border-b p-2 border-[rgba(0,0,0,0.2)] flex justify-center items-center">
          Turnovers
        </p>
        {getTeamStatDisplay(1, 12, homeTeamColor, true)}
        {getTeamStatDisplay(0, 6, awayTeamColor, false)}
        <p className="text-[10px] text-[rgba(0,0,0,0.6)] font-semibold w-full text-center border-l border-r border-dotted p-2 border-b border-[rgba(0,0,0,0.2)] flex justify-center items-center">
          Rebounds
        </p>
        {getTeamStatDisplay(1, 6, homeTeamColor, true)}
      </div>
    </div>
  );
}
