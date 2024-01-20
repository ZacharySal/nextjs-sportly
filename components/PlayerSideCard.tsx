import Image from "next/image";

export default function PlayerSideCard() {
  return (
    <div className="my-2 flex flex-row items-center justify-start gap-2">
      <Image
        src={`https://a.espncdn.com/i/headshots/nfl/players/full/4046557.png`}
        width={100}
        height={100}
        alt="player picture"
        className="w-7 object-contain"
      />
      <p>M. Jenkins</p>
    </div>
  );
}
