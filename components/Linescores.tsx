import { v4 } from "uuid";
import Image from "next/image";

export default function Linescores({ data }: { data: any }) {
  console.log(data);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div className="w-full grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] border-b gap-x-2 gap-2">
        <p className="col-start-2 text-[11px] text-center font-[500]">1</p>
        <p className="col-start-3 text-[11px] text-center font-[500]">2</p>
        <p className="col-start-4 text-[11px] text-center font-[500]">3</p>
        <p className="col-start-5 text-[11px] text-center font-[500]">4</p>
        <p className="col-start-6 text-[11px] text-center font-[500]">T</p>
      </div>
      <div className="w-full grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-x-2 gap-2 mt-2">
        <div className="flex items-center gap-2">
          <Image
            src={data.awayTeam.team.logos[0].href}
            width={data.awayTeam.team.logos[0].width}
            height={data.awayTeam.team.logos[0].height}
            className="w-5 object-contain"
            alt=" "
          />
          <p className="text-[12px] text-left font-[600] col-start-1">{data.awayTeam.team.name}</p>
        </div>
        {new Array(4).fill("1").map((num: string, i: number) => (
          <p key={v4()} className="text-[12px] text-center opacity-60">
            {data?.awayTeam?.linescores?.[i]?.displayValue ?? "-"}
          </p>
        ))}
        <p className="text-[12px] text-center font-[500]">{data?.awayTeam?.score ?? "0"}</p>
        <div className="flex items-center gap-2">
          <Image
            src={data.homeTeam.team.logos[0].href}
            width={data.homeTeam.team.logos[0].width}
            height={data.homeTeam.team.logos[0].height}
            className="w-5 object-contain"
            alt=" "
          />
          <p className="text-[12px] text-left font-[600] col-start-1">{data.homeTeam.team.name}</p>
        </div>
        {new Array(4).fill("1").map((num: string, i: number) => (
          <p key={v4()} className="text-[11px] text-center opacity-60">
            {data?.homeTeam?.linescores?.[i]?.displayValue ?? "-"}
          </p>
        ))}
        <p className="text-[12px] text-center font-[500]">{data?.homeTeam?.score ?? "0"}</p>
      </div>
    </div>
  );
}
