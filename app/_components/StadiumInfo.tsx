import Image from "next/image";

export default function StadiumInfo({ data }: { data: any }) {
  if (typeof data.gameData.gameInfo.venue.images[0] === "undefined") return null;
  return (
    <>
      <div className="w-full flex flex-col bg-white rounded-xl gap-2 p-3">
        <p className="text-sm font-semibold text-start">Stadium Information</p>

        <div className="w-auto h-48 relative">
          <Image
            src={data.gameData.gameInfo.venue.images[0]?.href}
            fill
            priority={true}
            className="object-cover rounded"
            alt="Stadium"
          />
        </div>

        <p className="opacity-80 font-bold">{data.gameData.gameInfo.venue.fullName}</p>
        <p className="opacity-80 text-sm mt-[-0.5rem]">
          {data.gameData.gameInfo.venue.address.city}, {data.gameData.gameInfo.venue.address.state}
        </p>
      </div>
    </>
  );
}
