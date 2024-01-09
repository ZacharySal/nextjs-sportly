import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { nameExceptions } from "../_lib/constants";

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
  data: any;
  league: string;
  isDesktopScreen: any;
}) {
  const [selectedTeam, setSelectedTeam] = useState(1);

  const homeTeamName = data.gameData.boxscore.teams[0].team.shortDisplayName;
  const awayTeamName = data.gameData.boxscore.teams[1].team.shortDisplayName;

  const teamLastFive = (teamId: number) => (
    <div>
      <table className="min-w-full table misc-table">
        <thead>
          <tr className="text-[11px] table-header">
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
              <td className="pl-1 injury-name opacity-60" align="left">
                {formatDate(event.gameDate)}
              </td>

              <td align="center">
                <div className="grid grid-cols-[15px_auto_20px] gap-x-1 justify-center items-center">
                  <p className="text-xs opacity-60 pr-2">{event.atVs}</p>
                  <Image
                    width={500}
                    height={500}
                    priority={true}
                    src={event.opponentLogo}
                    className="w-5 object-contain"
                    alt="team logo"
                  />
                  <Link href={`/${league}/team/${event.opponent.id}/home`}>
                    <p className="text-xs anchor-link">{event.opponent.abbreviation}</p>
                  </Link>
                </div>
              </td>

              <td className="pr-1 injury-date" align="right">
                <div className="flex justify-end pr-1">
                  <p
                    style={{ opacity: "1", color: event.gameResult === "W" ? "#094" : "#d00" }}
                    className="font-semibold text-[12px] w-7 text-center"
                  >
                    {event.gameResult}
                  </p>
                  <Link href={`/${league}/game/${event.id}/home`}>
                    <p className="w-10 text-right basis-1/3 text-sm text-xs text-black font-[400] anchor-link">
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
    <div className="bg-white rounded-xl w-full px-2 pb-4">
      <div className="flex w-full justify-around gap-3 my-5 rounded-2xl p-2 bg-[#edeef09c] text-center">
        <div
          onClick={() => setSelectedTeam(0)}
          className={`${
            selectedTeam === 0 && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          <div className="flex flex-row gap-1 items-center justify-center">
            <Image
              width={500}
              height={500}
              priority={true}
              src={data.gameData.boxscore.teams[1].team.logo}
              className="w-6 object-contain"
              alt="team logo"
            />
            <p style={{ color: selectedTeam === 0 ? "black" : "#6c6d6f" }} className="text-sm">
              {awayTeamName} Last Five
            </p>
          </div>
        </div>
        <div
          onClick={() => setSelectedTeam(1)}
          className={`${
            selectedTeam === 1 && "button-active"
          } flex-grow h-full text-xs cursor-pointer font-semibold`}
        >
          <div className="flex flex-row gap-1 items-center justify-center">
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
