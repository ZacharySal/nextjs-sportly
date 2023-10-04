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
        className="max-w-full 2xl:w-4/5 grid grid-cols-[1fr_minmax(0,3fr)_1fr] px-14 mx-auto gap-8 my-8"
      >
        {children}
      </Box>
    </>
  ) : (
    <>
      <Box className="w-full flex justify-center items-center">
        <Box className="w-full h-full flex flex-col justify-center items-start px-3 my-4">{children}</Box>
      </Box>
    </>
  );
}

export default ContainerBox;
