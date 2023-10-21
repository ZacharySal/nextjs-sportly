import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <>
      <a href={`${article.links.web.href}`} target="_blank">
        <Box className="w-full flex flex-col justify-center items-start gap-2">
          <Image
            src={article?.images[0]?.url}
            width={400}
            height={400}
            priority={true}
            alt="article picture"
            className="w-full object-contain"
          />
          <Typography className="text-xs">{article.description}</Typography>
        </Box>
      </a>
    </>
  );
}
