import { GameData } from "@/types";
import Image from "next/image";
import Link from "next/link";

function convertDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function GameRecapArticle({ data }: { data: GameData }) {
  if (typeof data.gameData.article == "undefined") return null;
  const hasVideo = data.gameData.article.images.length > 0;
  const hasArticle = typeof data.gameData.article !== "undefined";

  return (
    <>
      {hasVideo && (
        <div className="w-full rounded-xl bg-white p-3">
          <div className="article-video-container relative w-full cursor-pointer overflow-hidden">
            <Image
              width={data.gameData.article.images[0].width}
              height={data.gameData.article.images[0].height}
              alt="video"
              src={data.gameData.article.images[0].url}
              className="video-preview w-full rounded-xl object-cover"
            />
            <Link
              target="_blank"
              href={data.gameData.article.video?.[0]?.links["web"].href || "#"}
            >
              <div className="gray-circle"></div>
            </Link>
            <div className="arrow"></div>
          </div>
          <Link target="_blank" href={data.gameData.article.links["web"].href}>
            <div className="article-container custom-shadow mt-3 w-full cursor-pointer rounded-xl bg-white p-3">
              <p className="article-headline text-[14px] font-semibold opacity-80">
                {data.gameData.article.headline}
              </p>
              <p className="text-sm opacity-70">
                {data.gameData.article.description}
              </p>
              <p className="mt-2 text-sm opacity-60">
                {convertDate(data.gameData.article.published) + " - AP"}
              </p>
            </div>
          </Link>
        </div>
      )}
      {hasArticle && !hasVideo && (
        <Link target="_blank" href={data.gameData.article.links["web"].href}>
          <div className="article-container color-red w-full cursor-pointer rounded-xl bg-white p-3">
            <p className="article-headline text-[14px] font-[600] opacity-80">
              {data.gameData.article.headline}
            </p>
            <p className="text-sm opacity-60">
              {data.gameData.article.description}
            </p>
            <p className="mt-2 text-sm opacity-60">
              {convertDate(data.gameData.article.published) + " - AP"}
            </p>
          </div>
        </Link>
      )}
      {!hasArticle && !hasVideo && null}
    </>
  );
}
