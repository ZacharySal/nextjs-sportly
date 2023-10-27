import { Box } from "@mui/material";

function ContainerBox({
  isDesktopScreen,
  children,
}: {
  isDesktopScreen: boolean;
  children: React.ReactNode;
}) {
  return isDesktopScreen ? (
    <>
      <Box className="max-w-full 2xl:w-4/5 grid grid-cols-[2fr_minmax(0,4fr)_2fr] px-20 mx-auto gap-8 gap-x-5 my-3">
        {children}
      </Box>
    </>
  ) : (
    <>
      <Box className="w-full flex justify-center items-center">
        <Box className="w-full h-full flex flex-col justify-center items-start my-3">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default ContainerBox;
