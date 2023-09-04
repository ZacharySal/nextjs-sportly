import { Box } from "@mui/material";

function ContainerBox({
  mainColor,
  altColor,
  children,
}: {
  mainColor: string;
  altColor: string;
  children: React.ReactNode;
}) {
  return (
    <Box className="w-full flex justify-center items-center">
      <Box
        sx={{
          "&::before": {
            content: `""`,
            borderLeft: `60px solid #${altColor}`,
            borderRight: `60px solid #${mainColor}`,
            width: "13rem",
            height: "100vh",
            position: "fixed",
            zIndex: "-20",
            bottom: "-20rem",
            left: "5rem",
            rotate: "130deg",
          },
        }}
        className="w-4/5 h-full flex  flex-col md:flex-row justify-center items-start gap-8 my-8"
      >
        {children}
      </Box>
    </Box>
  );
}

export default ContainerBox;
