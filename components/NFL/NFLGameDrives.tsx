import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLGameDrives({ data }: { data: any }) {
  return (
    <div className="w-full bg-white rounded-xl p-3">
      <p className="text-[14px] font-semibold mb-2">Game Drives</p>
      <hr className="w-full color-[#edeef0]" />
      <div id="style-1" className="w-full md:max-h-full overflow-y-auto ">
        {data.gameData.drives.previous.map((drive: any) => (
          <Accordion key={uuidv4()}>
            <AccordionSummary
              style={{ padding: 0 }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="w-full grid grid-cols-[3fr_2fr] gap-x-2 text-center">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={drive.team.logos[0].href}
                    width={100}
                    height={100}
                    alt="team logo"
                    className="w-8 md:w-10 object-contain"
                  />
                  <p className="text-sm md:text-lg font-bold">{drive.displayResult}</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-7">
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-sm font-semibold">{drive.plays.length}</p>
                    <p className="text-xs opacity-70">Plays</p>
                  </div>
                  <div className="hidden md:block flex flex-col justify-center items-center">
                    <p className=" text-sm font-semibold">{drive.start.text}</p>
                    <p className="text-xs opacity-70">Start</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-sm font-semibold">{drive.yards}</p>
                    <p className="text-xs opacity-70">Yards</p>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "#edeef0;", padding: "8px 8px 8px" }}>
              <div className="flex flex-col gap-3">
                {drive.plays.map((play: any) => (
                  <div
                    key={uuidv4()}
                    style={{
                      borderColor: drive.team?.name
                        ? drive.team.name === data.homeTeam.team.name
                          ? `#${data.homeTeam.team.color}`
                          : `#${data.awayTeam.team.color}`
                        : "gray",
                    }}
                    className="flex flex-col justify-start items-start bg-white rounded p-3 border-l-8"
                  >
                    <p className="opacity-100 text-base font-semibold">{play.type.text}</p>
                    <p className="text-sm opacity-80">{play.text}</p>
                    <p className="text-xs opacity-80 mt-5">{play.start.downDistanceText}</p>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
