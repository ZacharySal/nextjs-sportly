import { Box } from "@mui/material";

function ContainerBox({
  mainColor,
  altColor,
  isDesktopScreen,
  children,
}: {
  mainColor: string;
  altColor: string;
  isDesktopScreen: boolean;
  children: React.ReactNode;
}) {
  return isDesktopScreen ? (
    <>
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
          className="w-4/5 h-full flex flex-row justify-center gap-8 items-start px-0 my-8"
        >
          {children}
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box className="w-full flex justify-center items-center">
        <Box className="w-full h-full flex flex-col justify-center items-start px-2 md:gap-8 my-4">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default ContainerBox;
