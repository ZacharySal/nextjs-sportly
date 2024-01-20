import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function NFLGameDrives({ data }: { data: any }) {
  return (
    <div className="w-full rounded-xl bg-white p-3">
      <p className="mb-2 text-[14px] font-semibold">Game Drives</p>
      <hr className="color-[#edeef0] w-full" />
      <div id="style-1" className="w-full overflow-y-auto md:max-h-full ">
        {data.gameData.drives.previous.map((drive: any) => (
          <Accordion key={uuidv4()}>
            <AccordionSummary
              style={{ padding: 0 }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="grid w-full grid-cols-[3fr_2fr] gap-x-2 text-center">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={drive.team.logos[0].href}
                    width={100}
                    height={100}
                    alt="team logo"
                    className="w-8 object-contain md:w-10"
                  />
                  <p className="text-sm font-bold md:text-lg">
                    {drive.displayResult}
                  </p>
                </div>
                <div className="grid grid-cols-3 items-center gap-7">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-semibold">
                      {drive.plays.length}
                    </p>
                    <p className="text-xs opacity-70">Plays</p>
                  </div>
                  <div className="flex hidden flex-col items-center justify-center md:block">
                    <p className=" text-sm font-semibold">{drive.start.text}</p>
                    <p className="text-xs opacity-70">Start</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-semibold">{drive.yards}</p>
                    <p className="text-xs opacity-70">Yards</p>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "#edeef0;", padding: "8px 8px 8px" }}
            >
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
                    className="flex flex-col items-start justify-start rounded border-l-8 bg-white p-3"
                  >
                    <p className="text-base font-semibold opacity-100">
                      {play.type.text}
                    </p>
                    <p className="text-sm opacity-80">{play.text}</p>
                    <p className="mt-5 text-xs opacity-80">
                      {play.start.downDistanceText}
                    </p>
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
