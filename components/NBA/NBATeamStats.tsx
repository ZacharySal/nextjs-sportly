import Image from "next/image";
import usePreferredColor from "../hooks/usePreferredColor";

export default function NBATeamStats({ data }: { data: any }) {
  const { homeTeamColor, awayTeamColor } = usePreferredColor(data);
  function getTeamStatDisplay(
    teamOption: number,
    statOption: number,
    color: string,
    homeTeam: boolean,
  ) {
    const statName =
      data.gameData?.boxscore?.teams?.[teamOption].statistics?.[statOption]
        ?.name;
    return (
      <div
        style={{
          paddingRight: homeTeam ? "0px" : "10px",
          paddingLeft: homeTeam ? "10px" : "0px",
        }}
        className="flex flex-col border-b border-dotted border-[rgba(0,0,0,0.2)] py-2"
      >
        <p className="text-lg font-bold">
          {
            data.gameData?.boxscore?.teams?.[teamOption].statistics?.[
              statOption
            ]?.displayValue
          }
        </p>
        <div className="relative h-[10px] w-full rounded-3xl bg-gray-300">
          <div className="absolute left-[25%] z-20 h-[10px] w-[1px] bg-gray-100 opacity-40"></div>
          <div className="absolute left-[50%] z-20 h-[10px] w-[1px] bg-gray-100 opacity-40"></div>
          <div className="absolute left-[75%] z-20 h-[10px] w-[1px] bg-gray-100 opacity-40"></div>
          <div
            style={{
              width:
                statName === "turnovers" || statName === "totalRebounds"
                  ? `${
                      (data.gameData?.boxscore?.teams?.[teamOption]
                        ?.statistics?.[statOption]?.displayValue /
                        Math.max(
                          data.gameData?.boxscore?.teams?.[0].statistics?.[
                            statOption
                          ]?.displayValue,
                          data.gameData?.boxscore?.teams?.[1].statistics?.[
                            statOption
                          ]?.displayValue,
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
    <div className="min-w-full rounded-md bg-white p-3">
      <h3 className="border-b border-dotted border-b-[rgba(0,0,0,0.2)] pb-2 text-[14px] font-semibold">
        Team Stats
      </h3>
      <div className="grid grid-cols-[2fr_1fr_2fr] border-b border-dotted border-b-[rgba(0,0,0,0.2)] py-2">
        <div className="flex items-center gap-1">
          <Image
            src={data.awayTeam.team.logos[0].href}
            alt={data.awayTeam.team.logos[0].alt}
            width={data.awayTeam.team.logos[0].width}
            height={data.awayTeam.team.logos[0].height}
            className="w-6 object-contain"
          />
          <h4 className="text-[12px] font-semibold">
            {data.awayTeam.team.abbreviation}
          </h4>
        </div>
        <div className="col-start-3 flex items-center gap-1">
          <Image
            src={data.homeTeam.team.logos[0].href}
            alt={data.homeTeam.team.logos[0].alt}
            width={data.homeTeam.team.logos[0].width}
            height={data.homeTeam.team.logos[0].height}
            className="w-6 object-contain"
          />
          <h4 className="text-[12px] font-semibold">
            {data.homeTeam.team.abbreviation}
          </h4>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_65px_2fr] grid-rows-[55px_55px_55px_55px]">
        {getTeamStatDisplay(0, 1, awayTeamColor, false)}
        <p className="flex w-full items-center justify-center border-b border-l border-r border-dotted border-[rgba(0,0,0,0.2)] p-2 text-center text-[10px] font-semibold text-[rgba(0,0,0,0.6)]">
          Field Goal %
        </p>
        {getTeamStatDisplay(1, 1, homeTeamColor, true)}
        {getTeamStatDisplay(0, 3, awayTeamColor, false)}
        <p className="flex w-full items-center justify-center border-b border-l border-r border-dotted border-[rgba(0,0,0,0.2)]  p-2 text-center text-[10px] font-semibold text-[rgba(0,0,0,0.6)]">
          Three Point %
        </p>
        {getTeamStatDisplay(1, 3, homeTeamColor, true)}
        {getTeamStatDisplay(0, 12, awayTeamColor, false)}
        <p className="flex w-full items-center justify-center border-b border-l border-r border-dotted border-[rgba(0,0,0,0.2)] p-2 text-center text-[10px] font-semibold text-[rgba(0,0,0,0.6)]">
          Turnovers
        </p>
        {getTeamStatDisplay(1, 12, homeTeamColor, true)}
        {getTeamStatDisplay(0, 6, awayTeamColor, false)}
        <p className="flex w-full items-center justify-center border-b border-l border-r border-dotted border-[rgba(0,0,0,0.2)] p-2 text-center text-[10px] font-semibold text-[rgba(0,0,0,0.6)]">
          Rebounds
        </p>
        {getTeamStatDisplay(1, 6, homeTeamColor, true)}
      </div>
    </div>
  );
}
