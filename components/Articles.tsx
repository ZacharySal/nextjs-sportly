import ArticleCard from "./ArticleCard";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { Article } from "@/types";

function Articles({
  title,
  news,
  limit,
}: {
  title: string;
  news: Array<Article>;
  limit: number;
}) {
  const articleLimit = limit > news.length ? news.length : limit;
  return (
    <div className="flex flex-col self-start rounded-xl bg-white p-3">
      <p className="mb-2 border-b border-dotted border-[rgba(0,0,0,0.2)] pb-2 text-[14px] font-semibold">
        {title}
      </p>
      {news.slice(0, articleLimit).map((article: any, index: number) => (
        <React.Fragment key={uuidv4()}>
          <ArticleCard key={uuidv4()} article={article} />
          {index + 1 != articleLimit && (
            <p className="my-3 w-full border-b border-dotted" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Articles;
