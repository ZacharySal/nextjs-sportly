import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`${article?.links?.web?.href}`} target="_blank">
      <div className="w-full flex flex-col md:flex-row justify-center items-start gap-2 article-container">
        <Image
          src={article?.images?.[0]?.url}
          width={article?.images?.[0]?.width || 400}
          height={article?.images?.[0]?.height || 400}
          priority={true}
          alt="article picture"
          className="w-full md:w-[65px] md:h-[60px] object-contain md:object-cover md:rounded-md"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-[12px] font-[600] article-headline">{article?.headline}</h3>
          <p className="text-[12px] text-[#6c6d6f] block">{article?.description}</p>
          <div className="gap-1 items-center hidden md:flex">
            <TimeAgo
              date={article?.published}
              className="text-[11px] text-[#a5a6a7]"
              live={false}
            />
            <p className="text-[11px] text-[#a5a6a7]">&bull; ESPN</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
