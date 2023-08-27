import { Box, Typography, Divider } from "@mui/material";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <>
      <a href={`${article.links.web.href}`} target="_blank">
        <Box className="w-full h-full flex flex-col justify-center items-start gap-2">
          <img className="w-full object-contain" src={article.images[0].url} />
          <Typography className="text-xs">{article.description}</Typography>
        </Box>
      </a>
    </>
  );
}
