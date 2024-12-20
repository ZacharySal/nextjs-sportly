"use client";
import Image from "next/image";
import {
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import usePreferredColor from "./hooks/usePreferredColor";

export default function GameFlow({
  data,
  isDesktopScreen,
}: {
  data: any;
  isDesktopScreen: boolean;
}) {
  const { homeTeamColor, awayTeamColor } = usePreferredColor(data);

  const dataPoints = data.gameData.plays
    .filter(
      (play: any, i: number) =>
        play?.scoringPlay || i == data.gameData.plays.length - 1,
    )
    .map((play: any) => {
      return {
        quarter: play?.period?.displayValue?.split(" ")[0],
        homeScore: play?.homeScore,
        awayScore: play?.awayScore,
        gameClock: play?.clock?.displayValue,
        playText: play?.text,
        homeTeamWinChance: data?.gameData?.winprobability?.find(
          (obj: any) => obj.playId === play.id,
        )?.homeWinPercentage,
      };
    });

  const finalDataPoint = dataPoints?.slice(-1)[0];

  return (
    <div className="relative flex w-full flex-col gap-3 rounded-md bg-white p-3 pb-[120px] text-[10px] md:pb-3">
      <h3 className="border-b border-dotted border-b-[rgba(0,0,0,0.2)] pb-2 text-[14px] font-semibold">
        Game Flow
      </h3>
      <div className="flex px-2">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: `#${awayTeamColor}` }}
            className="h-4 w-6 rounded-sm"
          />
          <Image
            src={data.awayTeam.team.logos[0].href}
            height={data.awayTeam.team.logos[0].height}
            width={data.awayTeam.team.logos[0].width}
            alt=""
            className="w-6 object-contain"
          />
          <p className="ml-1 text-[11px] font-[500] uppercase">
            {data.awayTeam.team.name}
          </p>
        </div>
        <div className=" ml-3 flex items-center gap-2">
          <div
            style={{ backgroundColor: `#${homeTeamColor}` }}
            className="h-4 w-6 rounded-sm"
          />
          <Image
            src={data.homeTeam.team.logos[0].href}
            height={data.homeTeam.team.logos[0].height}
            width={data.homeTeam.team.logos[0].width}
            alt=""
            className="w-6 object-contain"
          />
          <p className="ml-1 text-[11px] font-[500] uppercase">
            {data.homeTeam.team.name}
          </p>
        </div>
      </div>
      <ResponsiveContainer
        width={isDesktopScreen ? "69%" : "100%"}
        minWidth={isDesktopScreen ? "69%" : "100%"}
        height={250}
        className={"relative"}
      >
        <LineChart
          data={dataPoints as any[]}
          margin={{ left: 10, right: isDesktopScreen ? 0 : -20, top: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="1 4" />
          <Line
            type="monotone"
            connectNulls
            dataKey="homeScore"
            stroke={`#${homeTeamColor}`}
            strokeWidth="2"
            dot={false}
          />
          <Line
            type="monotone"
            connectNulls
            dataKey="awayScore"
            strokeWidth="2"
            stroke={`#${awayTeamColor}`}
            dot={false}
          />
          <XAxis
            dataKey="quarter"
            ticks={["1st", "2nd", "3rd", "4th"]}
            tickLine={false}
            tickSize={1}
            tickMargin={10}
            tick={true}
            interval={0}
          />
          <YAxis
            ticks={["25", "50", "75", "100", "125", "150"]}
            interval={0}
            orientation="right"
            tickSize={1}
            tickLine={false}
            tickMargin={10}
          />
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            position={isDesktopScreen ? { x: 380, y: 0 } : {}}
            content={(content) => (
              <div className="absolute left-[1px] top-[261px] z-10 min-w-[93vw] rounded-md bg-white p-2 md:left-[380px] md:top-[8px] md:h-[210px] md:w-[190px] md:min-w-0 md:p-4">
                <div className="mb-2 flex w-full justify-between border-b pb-2 md:mb-0 md:block md:border-none md:pb-0">
                  {content.payload?.[0]?.payload?.homeTeamWinChance >= 0.5 ? (
                    <div className="flex gap-1 font-[500] md:font-semibold">
                      <h3 className="text-[12px] md:text-[16px]">
                        {data.homeTeam.team.abbreviation}
                      </h3>
                      <h3 className="text-[12px] md:text-[16px]">{`${Number(
                        content.payload?.[0]?.payload?.homeTeamWinChance * 100,
                      ).toFixed(1)}%`}</h3>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-1 font-[500] md:font-semibold">
                        <h3 className="text-[12px] md:text-[16px]">
                          {data.awayTeam.team.abbreviation}
                        </h3>
                        <h3 className="text-[12px] md:text-[16px]">{`${Number(
                          100 -
                            content.payload?.[0]?.payload?.homeTeamWinChance *
                              100,
                        ).toFixed(1)}%`}</h3>
                      </div>
                    </>
                  )}
                  <h3 className="border-[rgba(0,0,0,0.2)] text-[11px] font-[500] md:mb-2 md:mt-2 md:border-b md:pb-2">{`${data.awayTeam.team.abbreviation} ${content.payload?.[0]?.payload?.awayScore} - ${data.homeTeam.team.abbreviation} ${content.payload?.[0]?.payload?.homeScore}`}</h3>
                </div>

                <p className="text-[11px] font-[500] opacity-80">
                  {content.payload?.[0]?.payload?.gameClock} -{" "}
                  {content.payload?.[0]?.payload?.quarter}
                </p>
                <p className="mt-1 max-w-full overflow-hidden text-[11px] opacity-60">
                  {content.payload?.[0]?.payload?.playText}
                </p>
              </div>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
      <div
        style={{ boxShadow: "2px 1px 10px 3px rgba(0,0,0,0.125)" }}
        className="absolute bottom-[21px] left-[13px] mx-auto  min-w-[93%] rounded-md bg-white p-2 md:left-[392px] md:top-[98px] md:mx-0 md:h-[210px] md:w-[190px] md:min-w-0 md:p-4"
      >
        <div className="mb-2 flex w-full justify-between border-b pb-2 md:mb-0 md:block md:border-none md:pb-0">
          {finalDataPoint?.homeTeamWinChance >= 0.5 ? (
            <div className="flex gap-1 font-[500] md:font-semibold">
              <h3 className="text-[12px] md:text-[16px]">
                {data.homeTeam.team.abbreviation}
              </h3>
              <h3 className="text-[12px] md:text-[16px]">{`${Number(
                finalDataPoint?.homeTeamWinChance * 100,
              ).toFixed(1)}%`}</h3>
            </div>
          ) : (
            <>
              <div className="flex gap-1 font-[500] md:font-semibold">
                <h3 className="text-[12px] md:text-[16px]">
                  {data.awayTeam.team.abbreviation}
                </h3>
                <h3 className="text-[12px] md:text-[16px]">{`${Number(
                  100 - finalDataPoint?.homeTeamWinChance * 100,
                ).toFixed(1)}%`}</h3>
              </div>
            </>
          )}

          <h3 className="border-[rgba(0,0,0,0.2)] text-[11px] font-[500] md:mb-2 md:mt-2 md:border-b md:pb-2">{`${data.awayTeam.team.abbreviation} ${finalDataPoint?.awayScore} - ${data.homeTeam.team.abbreviation} ${finalDataPoint?.homeScore}`}</h3>
        </div>

        <p className="text-[11px] font-[500] opacity-80">
          {finalDataPoint?.gameClock} - {finalDataPoint?.quarter}
        </p>
        <p className="mt-1 max-w-full overflow-hidden text-[11px] opacity-60">
          {finalDataPoint?.playText}
        </p>
      </div>
    </div>
  );
}
