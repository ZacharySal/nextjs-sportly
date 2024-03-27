import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`${article?.links?.web?.href}`} target="_blank">
      <div className="article-container flex w-full flex-col items-start justify-center gap-2 md:flex-row">
        <Image
          src={article?.images?.[0]?.url}
          width={article?.images?.[0]?.width || 400}
          height={article?.images?.[0]?.height || 400}
          priority={true}
          alt="article picture"
          className="w-full object-contain md:h-[60px] md:w-[65px] md:rounded-md md:object-cover"
        />
        <div className="flex flex-col gap-1">
          <h3 className="article-headline text-[12px] font-[600]">
            {article?.headline}
          </h3>
          <p className="block text-[12px] text-[#6c6d6f]">
            {article?.description}
          </p>
          <div className="hidden items-center gap-1 md:flex">
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
