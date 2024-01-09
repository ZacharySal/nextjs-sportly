import ArticleCard from "./ArticleCard";
import { v4 as uuidv4 } from "uuid";
import React from "react";

function Articles({ title, teamNews, limit }: { title: string; teamNews: any; limit: number }) {
  const articleLimit = limit > teamNews.articles.length ? teamNews.articles.length : limit;
  return (
    <div className="self-start p-3 flex flex-col rounded-xl bg-white">
      <p className="mb-2 font-semibold text-sm">{title}</p>
      {teamNews.articles
        .filter((article: any) => article.type !== "Preview")
        .slice(0, articleLimit)
        .map((article: any, index: number) => (
          <React.Fragment key={uuidv4()}>
            <ArticleCard key={uuidv4()} article={article} />
            {index + 1 != articleLimit && <hr className="w-full color-[#edeef0] my-[0.5rem]" />}
          </React.Fragment>
        ))}
    </div>
  );
}

export default Articles;
