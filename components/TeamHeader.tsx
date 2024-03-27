import Image from "next/image";

export default function TeamHeader({
  data = null,
  league,
}: {
  data: any;
  league: string;
}) {
  let record;
  try {
    record = data.team.record.items[0].summary;
  } catch {
    record = "0-0";
  }

  return (
    <div className="sticky top-[2.75rem] z-40 flex w-full justify-center border-b border-[rgba(0,0,0,0.2)] bg-white">
      <div className="relative ml-5 flex h-20 w-full flex-row items-center justify-start gap-3 md:ml-10 md:h-24 2xl:w-2/5">
        <Image
          src={data.team.logos[0].href}
          width={data.team.logos[0].width}
          height={data.team.logos[0].height}
          alt="team logo"
          className="md:w-18 w-14 object-contain"
        />
        <div className="flex flex-col">
          <p className="text-xl uppercase opacity-80 md:text-2xl">
            {data.team.location + " "}{" "}
            <span className="font-bold">{data.team.name}</span>
          </p>
          <p className="text-sm opacity-60">
            {record + " • " + data.team.standingSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
