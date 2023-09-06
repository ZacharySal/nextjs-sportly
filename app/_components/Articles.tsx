import { Box, Typography, Divider } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { v4 as uuidv4 } from "uuid";
import React from "react";

function Articles({
  title,
  teamNews,
  articleLimit,
}: {
  title: string;
  teamNews: any;
  articleLimit: number | undefined;
}) {
  return (
    <Box className="w-full md:w-1/3 p-3 flex flex-col rounded-xl bg-white drop-shadow-md">
      <Typography className="mb-2 font-semibold text-sm opacity-70">
        {title}
      </Typography>
      {teamNews.articles
        .slice(0, articleLimit)
        .map((article: any, index: number) => (
          <React.Fragment key={uuidv4()}>
            <ArticleCard key={uuidv4()} article={article} />
            {index + 1 != articleLimit && (
              <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
            )}
          </React.Fragment>
        ))}
    </Box>
  );
}

export default Articles;
