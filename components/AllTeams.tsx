import TeamSideCard from "./TeamSideCard";
import { v4 as uuidv4 } from "uuid";

function AllTeams({ allTeams, league }: { allTeams: any; league: string }) {
  return (
    <div className="w-full rounded-xl bg-white">
      <p className="mb-[-0.35rem] p-3 text-xl font-bold opacity-80 md:text-2xl">
        {league.toUpperCase()} Teams
      </p>
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-2">
        {Object.entries(allTeams).map(([conference, teams]: [string, any]) => (
          <div key={uuidv4()} className="p-3">
            <h1 className="mb-1 text-[13px] font-bold opacity-80">
              {conference}
            </h1>
            <hr></hr>
            {teams.map((team: any) => (
              <TeamSideCard key={uuidv4()} name={team} league={league} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTeams;
