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

export default function GameRecapArticle({ data }: { data: any }) {
  if (typeof data.gameData.article == "undefined") return null;
  const hasVideo = data.gameData.article.images.length > 0;
  const hasArticle = typeof data.gameData.article !== "undefined";

  return (
    <>
      {hasVideo && (
        <div className="w-full bg-white p-3 rounded-xl">
          <div className="w-full relative cursor-pointer article-video-container overflow-hidden">
            <Image
              width={data.gameData.article.images[0].width}
              height={data.gameData.article.images[0].height}
              alt="video"
              src={data.gameData.article.images[0].url}
              className="w-full object-cover video-preview rounded-xl"
            />
            <Link target="_blank" href={data.gameData.article.video[0].links["web"].href}>
              <div className="gray-circle"></div>
            </Link>
            <div className="arrow"></div>
          </div>
          <Link target="_blank" href={data.gameData.article.links["web"].href}>
            <div className="article-container w-full bg-white rounded-xl p-3 mt-3 cursor-pointer custom-shadow">
              <p className="text-sm opacity-80 font-semibold article-headline">
                {data.gameData.article.headline}
              </p>
              <p className="text-sm opacity-70">{data.gameData.article.description}</p>
              <p className="text-sm opacity-60 mt-2">
                {convertDate(data.gameData.article.published) + " - AP"}
              </p>
            </div>
          </Link>
        </div>
      )}
      {hasArticle && !hasVideo && (
        <Link target="_blank" href={data.gameData.article.links["web"].href}>
          <div className="article-container w-full bg-white p-3 rounded-xl cursor-pointer color-red">
            <p className="text-sm opacity-80 font-[600] article-headline">
              {data.gameData.article.headline}
            </p>
            <p className="text-sm opacity-60">{data.gameData.article.description}</p>
            <p className="text-sm opacity-60 mt-2">
              {convertDate(data.gameData.article.published) + " - AP"}
            </p>
          </div>
        </Link>
      )}
      {!hasArticle && !hasVideo && null}
    </>
  );
}
