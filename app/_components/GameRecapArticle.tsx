import { Box, Typography } from "@mui/material";
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
        <Box className="w-full bg-white p-3 rounded-xl">
          <Box className="w-full relative cursor-pointer article-video-container overflow-hidden">
            <Image
              width={1000}
              height={1000}
              alt="video"
              src={data.gameData.article.images[0].url}
              className="w-full object-cover video-preview rounded-xl"
            />
            <Link target="_blank" href={data.gameData.article.video[0].links["web"].href}>
              <Box className="gray-circle"></Box>
            </Link>
            <Box className="arrow"></Box>
          </Box>
          <Link target="_blank" href={data.gameData.article.links["web"].href}>
            <Box className="article-container w-full bg-white rounded-xl p-3 mt-3 cursor-pointer custom-shadow">
              <Typography className="text-sm opacity-80 font-semibold article-headline">
                {data.gameData.article.headline}
              </Typography>
              <Typography className="text-sm opacity-70">
                {data.gameData.article.description}
              </Typography>
              <Typography className="text-sm opacity-60 mt-2">
                {convertDate(data.gameData.article.published) + " - AP"}
              </Typography>
            </Box>
          </Link>
        </Box>
      )}
      {hasArticle && !hasVideo && (
        <Link target="_blank" href={data.gameData.article.links["web"].href}>
          <Box className="article-container w-full bg-white p-3 rounded-xl cursor-pointer color-red">
            <Typography className="text-sm opacity-80 font-[600] article-headline">
              {data.gameData.article.headline}
            </Typography>
            <Typography className="text-sm opacity-60">
              {data.gameData.article.description}
            </Typography>
            <Typography className="text-sm opacity-60 mt-2">
              {convertDate(data.gameData.article.published) + " - AP"}
            </Typography>
          </Box>
        </Link>
      )}
      {!hasArticle && !hasVideo && null}
    </>
  );
}
