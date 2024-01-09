import { v4 as uuidv4 } from "uuid";
import ScoreCard from "./ScoreCard";

export default function SeasonSeries({ data }: { data: any }) {
  return (
    <div className="bg-white p-3 rounded-xl">
      <p className="font-semibold opacity-70 text-sm">{data.gameData.seasonseries[0].title}</p>
      <p className="opacity-80 text-xs">
        {data.gameData.seasonseries[0].summary.replaceAll("series", "")}
      </p>
      {data.gameData.seasonseries[0].events.map((event: any, i: number) => (
        <div key={uuidv4()}>
          <ScoreCard gameInfo={event} league={"MLB"} />
          {i !== data.gameData.seasonseries[0].events.length - 1 && <hr></hr>}
        </div>
      ))}
    </div>
  );
}
