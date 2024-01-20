import Image from "next/image";

export default function LeagueHeader({
  backgroundColor,
  league,
}: {
  backgroundColor: string;
  league: string;
}) {
  let fullLeague;

  if (league === "nfl") fullLeague = "National Football League";
  if (league === "mlb") fullLeague = "Major League Baseball";
  if (league === "nba") fullLeague = "National Basketball Association";
  return (
    <div
      style={{ backgroundColor: `#${backgroundColor}` }}
      className="flex h-28 w-full flex-row items-center justify-start gap-6 pl-5 md:h-40 md:pl-60"
    >
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src={`/${league}/${league}-logo.png`}
          width={500}
          height={500}
          alt="league logo"
          className=" w-20 object-cover md:w-32"
        />
        <div className="flex flex-col text-white opacity-80">
          <p className=" text-xl opacity-70 md:text-3xl">{fullLeague}</p>
          <p className=" text-xl font-bold md:text-3xl">
            {league.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
