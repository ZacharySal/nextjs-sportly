import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

const setTeamImageSrc = (teamName: string, league: string) => {
  try {
    const src = require(`public/${league}/${teamName
      .replaceAll(" ", "")
      .toLowerCase()}.png`);
    return src;
  } catch {
    return `/default.png`;
  }
};

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
            article.type !== "Preview" && article.type !== "Recap"
        )
        .map((article: any) => (
          <Link key={uuidv4()} target="_blank" href={article.links["web"].href}>
            <Box className="w-full bg-white px-3 py-1 flex rounded-xl mb-4 flex-col article-container">
              <Box
                /*style={{backgroundColor: `#${data.teamData.team.color}`}}*/ className="flex flex-row justify-start items-center gap-2 mb-1"
              >
                <Image
                  width={100}
                  height={100}
                  priority={true}
                  src={setTeamImageSrc(
                    data.teamData.team.shortDisplayName,
                    league
                  )}
                  className="w-10 object-contain"
                  alt="team logo"
                />
                <Box className="flex flex-col gap-0 h-full">
                  <Typography className="font-semibold tracking-wider">
                    {data.teamData.team.name}
                  </Typography>
                  {/* <Typography className="text-xs opacity-70 m-0">NFL</Typography> */}
                </Box>
              </Box>
              <Box className="mb-2 bg-white drop-shadow-lg rounded-xl cursor-pointer">
                <Image
                  width={2000}
                  height={2000}
                  priority={true}
                  src={article.images[0].url}
                  className="w-full max-h-[22rem] object-cover rounded-t-xl border-b-4 border-gray-300 object-center"
                  alt="team logo"
                />
                <Box className="p-2">
                  <Typography className="text-sm font-bold article-headline">
                    {article.headline}
                  </Typography>
                  <Typography className="text-xs opacity-40">
                    {formatDate(article.published)} •{" "}
                    {typeof article.byline !== "undefined"
                      ? article.byline
                      : "AP"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
    </>
  );
}
