import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLGameDrives({ data }: { data: any }) {
  return (
    <Box className="w-full bg-white rounded-xl p-3">
      <Typography className="text-sm opacity-70 font-semibold mb-4">Game Drives</Typography>
      <Divider className="w-full color-[#edeef0] my-[0.5rem]" />
      <Box id="style-1" className="w-full md:max-h-[40rem] overflow-y-auto ">
        {data.gameData.drives.previous.map((drive: any) => (
          <Accordion key={uuidv4()}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Box className="w-full grid grid-cols-[3fr_2fr] gap-x-2 text-center">
                <Box className="flex flex-row items-center gap-2">
                  <Image
                    src={drive.team.logos[0].href}
                    width={100}
                    height={100}
                    alt="team logo"
                    className="w-8 md:w-10 object-contain"
                  />
                  <Typography className="text-sm md:text-lg font-bold">{drive.displayResult}</Typography>
                </Box>
                <Box className="grid grid-cols-3 items-center gap-7">
                  <Box className="flex flex-col justify-center items-center">
                    <Typography className="text-sm font-semibold">{drive.plays.length}</Typography>
                    <Typography className="text-xs opacity-70">Plays</Typography>
                  </Box>
                  <Box className="hidden md:block flex flex-col justify-center items-center">
                    <Typography className=" text-sm font-semibold">{drive.start.text}</Typography>
                    <Typography className="text-xs opacity-70">Start</Typography>
                  </Box>
                  <Box className="flex flex-col justify-center items-center">
                    <Typography className="text-sm font-semibold">{drive.yards}</Typography>
                    <Typography className="text-xs opacity-70">Yards</Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#edeef0;" }}>
              <Box className="flex flex-col gap-3">
                {drive.plays.map((play: any) => (
                  <Box
                    key={uuidv4()}
                    sx={{
                      borderColor: drive.team?.name
                        ? drive.team.name === data.homeTeam.team.name
                          ? `#${data.homeTeam.team.color}`
                          : `#${data.awayTeam.team.color}`
                        : "gray",
                    }}
                    className="flex flex-col justify-start items-start bg-white rounded p-3 border-l-8"
                  >
                    <Typography className="opacity-100 text-base font-semibold">{play.type.text}</Typography>
                    <Typography className="text-sm opacity-80">{play.text}</Typography>
                    <Typography className="text-xs opacity-80 mt-5">{play.start.downDistanceText}</Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
