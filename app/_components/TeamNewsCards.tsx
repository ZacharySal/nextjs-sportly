import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export default function TeamNewsCards({ data, league }: { data: any; league: string }) {
  return (
    <>
      {data.teamNews.articles
        .filter((article: any) => article.type !== "Preview" && article.type !== "Recap")
        .map((article: any) => (
          <Link key={uuidv4()} target="_blank" href={article.links["web"].href}>
            <Box className="w-full bg-white px-3 py-1 flex rounded-xl mb-4 flex-col article-container">
              <Box className="flex flex-row justify-start items-center gap-1 mb-1">
                <Image
                  width={data.teamData.team.logos[0].width}
                  height={data.teamData.team.logos[0].height}
                  priority={true}
                  src={data.teamData.team.logos[0].href}
                  className="w-7 object-contain"
                  alt="team logo"
                />
                <Typography className="font-semibold tracking-wider">
                  {data.teamData.team.name}
                </Typography>
              </Box>
              <Box className="mb-2 bg-white drop-shadow-lg rounded-xl cursor-pointer">
                <Image
                  width={article.images[0].width}
                  height={article.images[0].height}
                  priority={true}
                  src={article.images[0].url}
                  className="min-w-full max-h-[22rem] object-cover rounded-t-xl border-b-4 border-gray-300"
                  alt="team logo"
                />
                <Box className="p-2">
                  <Typography className="text-sm font-bold article-headline">
                    {article.headline}
                  </Typography>
                  <Typography className="text-xs opacity-40">
                    {formatDate(article.published)} •{" "}
                    {typeof article.byline !== "undefined" ? article.byline : "AP"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
    </>
  );
}
