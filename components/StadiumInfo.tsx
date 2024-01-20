import { GameData } from "@/types";
import Image from "next/image";

export default function StadiumInfo({ data }: { data: GameData }) {
  if (typeof data.gameData.gameInfo.venue.images[0] === "undefined")
    return null;
  return (
    <>
      <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-3">
        <p className="mb-2 border-b border-dotted border-[rgba(0,0,0,0.2)] pb-2 text-start text-[14px] font-semibold">
          Stadium Information
        </p>

        <div className="relative h-48 w-auto">
          <Image
            src={data.gameData.gameInfo.venue.images[0]?.href}
            fill
            priority={true}
            className="rounded object-cover"
            alt="Stadium"
          />
        </div>

        <p className="text-sm font-semibold">
          {data.gameData.gameInfo.venue.fullName}
        </p>
        <p className="mt-[-0.5rem] text-sm opacity-80">
          {data.gameData.gameInfo.venue.address.city},{" "}
          {data.gameData.gameInfo.venue.address.state}
        </p>
      </div>
    </>
  );
}
