import Image from "next/image";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <>
      <a href={`${article.links.web.href}`} target="_blank">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Image
            src={article?.images[0]?.url}
            width={article?.images[0]?.width || 400}
            height={article?.images[0]?.height || 400}
            priority={true}
            alt="article picture"
            className="w-full object-contain"
          />
          <p className="text-xs">{article.description}</p>
        </div>
      </a>
    </>
  );
}
