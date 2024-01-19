import ArticleCard from "./ArticleCard";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { Article } from "@/types";

function Articles({ title, news, limit }: { title: string; news: Array<Article>; limit: number }) {
  const articleLimit = limit > news.length ? news.length : limit;
  return (
    <div className="self-start p-3 flex flex-col rounded-xl bg-white">
      <p className="mb-2 font-semibold text-[14px] pb-2 border-b border-dotted border-[rgba(0,0,0,0.2)]">
        {title}
      </p>
      {news.slice(0, articleLimit).map((article: any, index: number) => (
        <React.Fragment key={uuidv4()}>
          <ArticleCard key={uuidv4()} article={article} />
          {index + 1 != articleLimit && <p className="w-full my-3 border-b border-dotted" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Articles;
