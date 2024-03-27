import { v4 } from "uuid";
import Image from "next/image";
import { GameData } from "@/types";

export default function Linescores({ data }: { data: GameData }) {
  return (
    <div className="w-full rounded-md bg-white p-3">
      <div className="grid w-full grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-2 gap-x-2 border-b">
        <p className="col-start-2 text-center text-[11px] font-[500]">1</p>
        <p className="col-start-3 text-center text-[11px] font-[500]">2</p>
        <p className="col-start-4 text-center text-[11px] font-[500]">3</p>
        <p className="col-start-5 text-center text-[11px] font-[500]">4</p>
        <p className="col-start-6 text-center text-[11px] font-[500]">T</p>
      </div>
      <div className="mt-2 grid w-full grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-2 gap-x-2">
        <div className="flex items-center gap-2">
          <Image
            src={data.awayTeam.team.logos[0].href}
            width={data.awayTeam.team.logos[0].width}
            height={data.awayTeam.team.logos[0].height}
            className="w-5 object-contain"
            alt=" "
          />
          <p className="col-start-1 text-left text-[12px] font-[600]">
            {data.awayTeam.team.name}
          </p>
        </div>
        {new Array(4).fill("1").map((num: string, i: number) => (
          <p key={v4()} className="text-center text-[12px] opacity-60">
            {data?.awayTeam?.linescores?.[i]?.displayValue ?? "-"}
          </p>
        ))}
        <p className="text-center text-[12px] font-[500]">
          {data?.awayTeam?.score ?? "0"}
        </p>
        <div className="flex items-center gap-2">
          <Image
            src={data.homeTeam.team.logos[0].href}
            width={data.homeTeam.team.logos[0].width}
            height={data.homeTeam.team.logos[0].height}
            className="w-5 object-contain"
            alt=" "
          />
          <p className="col-start-1 text-left text-[12px] font-[600]">
            {data.homeTeam.team.name}
          </p>
        </div>
        {new Array(4).fill("1").map((num: string, i: number) => (
          <p key={v4()} className="text-center text-[11px] opacity-60">
            {data?.homeTeam?.linescores?.[i]?.displayValue ?? "-"}
          </p>
        ))}
        <p className="text-center text-[12px] font-[500]">
          {data?.homeTeam?.score ?? "0"}
        </p>
      </div>
    </div>
  );
}
