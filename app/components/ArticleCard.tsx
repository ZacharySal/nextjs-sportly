import { Box, Typography, Divider } from "@mui/material";

type articleData = {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  relevance_score: number;
};

export default function ArticleCard({ data }: { data: articleData }) {
  return (
    <>
      <Box className="w-full h-full flex flex-col justify-center items-start gap-1">
        <img className="w-full object-contain" src={data.image_url} />
        <h2 className="font-semibold">{data.title}</h2>
        <h4>
          {data.description.substring(0, 100)}
          {data.description.length > 100 ? "..." : ""}
        </h4>
        <Divider flexItem className="my-2" />
      </Box>
    </>
  );
}
