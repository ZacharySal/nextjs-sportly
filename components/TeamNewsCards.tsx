import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export default function TeamNewsCards({
  data,
  league,
}: {
  data: any;
  league: string;
}) {
  return (
    <>
      {data.teamNews.articles
        .filter(
          (article: any) =>
            article.type !== "Preview" && article.type !== "Recap",
        )
        .map((article: any) => (
          <Link key={uuidv4()} target="_blank" href={article.links["web"].href}>
            <div className="article-container mb-4 flex w-full flex-col rounded-xl bg-white px-3 py-1">
              <div className="mb-1 flex flex-row items-center justify-start gap-1">
                <Image
                  width={data.teamData.team.logos[0].width}
                  height={data.teamData.team.logos[0].height}
                  priority={true}
                  src={data.teamData.team.logos[0].href}
                  className="w-7 object-contain"
                  alt="team logo"
                />
                <p className="font-semibold tracking-wider">
                  {data.teamData.team.name}
                </p>
              </div>
              <div className="mb-2 cursor-pointer rounded-xl bg-white drop-shadow-lg">
                <Image
                  width={article.images[0].width}
                  height={article.images[0].height}
                  priority={true}
                  src={article.images[0].url}
                  className="max-h-[22rem] min-w-full rounded-t-xl border-b-4 border-gray-300 object-cover"
                  alt="team logo"
                />
                <div className="p-2">
                  <p className="article-headline text-sm font-bold">
                    {article.headline}
                  </p>
                  <p className="text-xs opacity-40">
                    {formatDate(article.published)} •{" "}
                    {typeof article.byline !== "undefined"
                      ? article.byline
                      : "AP"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}
