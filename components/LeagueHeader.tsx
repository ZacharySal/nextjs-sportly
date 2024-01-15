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
      className="w-full h-28 md:h-40 flex-row flex justify-start items-center gap-6 pl-5 md:pl-60"
    >
      <div className="flex flex-row justify-center items-center gap-3">
        <Image
          src={`/${league}/${league}-logo.png`}
          width={500}
          height={500}
          alt="league logo"
          className=" w-20 md:w-32 object-cover"
        />
        <div className="flex flex-col text-white opacity-80">
          <p className=" text-xl md:text-3xl opacity-70">{fullLeague}</p>
          <p className=" text-xl md:text-3xl font-bold">{league.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}