import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { nameExceptions } from "../lib/constants";
import { GameData } from "@/types";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
};

export default function LastFive({
  data,
  league,
  isDesktopScreen,
}: {
  data: GameData;
  league: string;
  isDesktopScreen: boolean;
}) {
  const [selectedTeam, setSelectedTeam] = useState(1);

  const homeTeamName = data.gameData.boxscore.teams[0].team.shortDisplayName;
  const awayTeamName = data.gameData.boxscore.teams[1].team.shortDisplayName;

  const teamLastFive = (teamId: number) => (
    <div>
      <table className="misc-table table min-w-full">
        <thead>
          <tr className="table-header text-[11px]">
            <th className="pl-1" align="left">
              DATE
            </th>
            <th align="center">OPP</th>
            <th className="pr-1" align="right">
              RESULT
            </th>
          </tr>
        </thead>
        <tbody>
          {data.gameData.lastFiveGames[teamId].events.map((event: any) => (
            <tr key={uuidv4()} className="text-xs">
              <td className="injury-name pl-1 opacity-60" align="left">
                {formatDate(event.gameDate)}
              </td>

              <td align="center">
                <div className="grid grid-cols-[15px_auto_20px] items-center justify-center gap-x-1">
                  <p className="pr-2 text-xs opacity-60">{event.atVs}</p>
                  <Image
                    width={500}
                    height={500}
                    priority={true}
                    src={event.opponentLogo}
                    className="w-5 object-contain"
                    alt="team logo"
                  />
                  <Link href={`/${league}/team/${event.opponent.id}/home`}>
                    <p className="anchor-link text-xs">
                      {event.opponent.abbreviation}
                    </p>
                  </Link>
                </div>
              </td>

              <td className="injury-date pr-1" align="right">
                <div className="flex justify-end pr-1">
                  <p
                    style={{
                      opacity: "1",
                      color: event.gameResult === "W" ? "#094" : "#d00",
                    }}
                    className="w-7 text-center text-[12px] font-semibold"
                  >
                    {event.gameResult}
                  </p>
                  <Link href={`/${league}/game/${event.id}/home`}>
                    <p className="anchor-link w-10 basis-1/3 text-right text-sm text-xs font-[400] text-black">
                      {event.score}
                    </p>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const mobileView = () => (
    <div className="w-full rounded-xl bg-white px-2 pb-4">
      <div className="my-5 flex w-full justify-around gap-3 rounded-2xl bg-[#edeef09c] p-2 text-center">
        <div
          onClick={() => setSelectedTeam(0)}
          className={`${
            selectedTeam === 0 && "button-active"
          } h-full flex-grow cursor-pointer text-xs font-semibold`}
        >
          <div className="flex flex-row items-center justify-center gap-1">
            <Image
              width={500}
              height={500}
              priority={true}
              src={data.gameData.boxscore.teams[1].team.logo}
              className="w-6 object-contain"
              alt="team logo"
            />
            <p
              style={{ color: selectedTeam === 0 ? "black" : "#6c6d6f" }}
              className="text-sm"
            >
              {awayTeamName} Last Five
            </p>
          </div>
        </div>
        <div
          onClick={() => setSelectedTeam(1)}
          className={`${
            selectedTeam === 1 && "button-active"
          } h-full flex-grow cursor-pointer text-xs font-semibold`}
        >
          <div className="flex flex-row items-center justify-center gap-1">
            <Image
              width={500}
              height={500}
              priority={true}
              src={data.gameData.boxscore.teams[0].team.logo}
              className="w-6 object-contain"
              alt="team logo"
            />
            <p
              style={{ color: selectedTeam === 1 ? "black" : "#6c6d6f" }}
              className="text-sm text-gray-500"
            >
              {homeTeamName} Last Five
            </p>
          </div>
        </div>
      </div>
      {teamLastFive(selectedTeam)}
    </div>
  );

  const desktopView = () => <></>;
  return <>{isDesktopScreen ? mobileView() : mobileView()}</>;
}
