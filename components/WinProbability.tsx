// "use client";
// import Image from "next/image";
// import {
//   LineChart,
//   CartesianGrid,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";
// import usePreferredColor from "./hooks/usePreferredColor";

// export default function WinProbability({
//   data,
//   isDesktopScreen,
// }: {
//   data: any;
//   isDesktopScreen: boolean;
// }) {
//   const { homeTeamColor, awayTeamColor } = usePreferredColor(data);

//   const dataPoints = data.gameData.plays
//     .filter((play: any, i: number) => play.scoringPlay || i == data.gameData.plays.length - 1)
//     .map((play: any) => {
//       return {
//         quarter: play.period.displayValue.split(" ")[0],
//         homeScore: play.homeScore,
//         awayScore: play.awayScore,
//         gameClock: play.clock.displayValue,
//         playText: play.text,
//         homeTeamWinChance:
//           data.gameData.winprobability.find((obj: any) => obj.playId === play.id)
//             ?.homeWinPercentage * 100,
//         awayTeamWinChance:
//           (1 -
//             data.gameData.winprobability.find((obj: any) => obj.playId === play.id)
//               ?.homeWinPercentage) *
//           100,
//       };
//     });

//   const dataMax = Math.max(...dataPoints.map((i: any) => i.homeTeamWinChance));
//   const dataMin = Math.min(...dataPoints.map((i: any) => i.homeTeamWinChance));

//   const gradientOffset = () => {
//     if (dataMax <= 0) {
//       return 0;
//     }
//     if (dataMin >= 0) {
//       return 1;
//     }

//     return dataMax / (dataMax - dataMin);
//   };

//   const off = gradientOffset();

//   const finalDataPoint = dataPoints.slice(-1)[0];
//   console.log(dataPoints);

//   return (
//     <div className="rounded-md text-[10px] w-full bg-white p-3 flex flex-col gap-3 relative pb-[120px] md:pb-3">
//       <h3 className="font-semibold text-[14px] pb-2 border-b border-b-[rgba(0,0,0,0.2)] border-dotted">
//         Win Probability
//       </h3>
//       <div className="flex px-2">
//         <div className="flex items-center gap-2">
//           <div style={{ backgroundColor: `#${awayTeamColor}` }} className="w-6 h-4 rounded-sm" />
//           <Image
//             src={data.awayTeam.team.logos[0].href}
//             height={data.awayTeam.team.logos[0].height}
//             width={data.awayTeam.team.logos[0].width}
//             alt=""
//             className="w-6 object-contain"
//           />
//           <p className="text-[11px] uppercase font-[500] ml-1">{data.awayTeam.team.name}</p>
//         </div>
//         <div className=" ml-3 flex items-center gap-2">
//           <div style={{ backgroundColor: `#${homeTeamColor}` }} className="w-6 h-4 rounded-sm" />
//           <Image
//             src={data.homeTeam.team.logos[0].href}
//             height={data.homeTeam.team.logos[0].height}
//             width={data.homeTeam.team.logos[0].width}
//             alt=""
//             className="w-6 object-contain"
//           />
//           <p className="text-[11px] uppercase font-[500] ml-1">{data.homeTeam.team.name}</p>
//         </div>
//       </div>
//       <ResponsiveContainer
//         width={isDesktopScreen ? "69%" : "100%"}
//         minWidth={isDesktopScreen ? "69%" : "100%"}
//         height={250}
//         className={"relative"}
//       >
//         <AreaChart
//           data={dataPoints as any[]}
//           margin={{ left: 10, right: isDesktopScreen ? 0 : -20, top: 20 }}
//         >
//           <CartesianGrid stroke="#ccc" strokeDasharray="1 4" />
//           {/* <Area
//             type="monotone"
//             dataKey="homeTeamWinChance"
//             stroke={`#${homeTeamColor}`}
//             fill={`#${homeTeamColor}`}
//           /> */}
//           {/* <Area
//             type="monotone"
//             dataKey="awayTeamWinChance"
//             stroke={`#${awayTeamColor}`}
//             baselineShift={50}
//             // fill={`#${awayTeamColor}`}
//             fill="url(#splitColor)"
//             orientation="top"
//           /> */}
//           <defs>
//             <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
//               <stop offset={off} stopColor="green" stopOpacity={1} />
//               <stop offset={off} stopColor="red" stopOpacity={1} />
//             </linearGradient>
//           </defs>
//           <Area type="monotone" dataKey="awayTeamWinChance" stroke="#000" fill="url(#splitColor)" />
//           {/* <XAxis
//             dataKey="quarter"
//             ticks={["1st", "2nd", "3rd", "4th"]}
//             tickLine={false}
//             tickSize={1}
//             tickMargin={10}
//             tick={true}
//             interval={0}
//             hide={true}
//           /> */}
//           <XAxis
//             dataKey="quarter"
//             ticks={["1st", "2nd", "3rd", "4th"]}
//             tickLine={true}
//             tickSize={1}
//             tickMargin={10}
//             orientation="top"
//             tick={true}
//             interval={0}
//           />
//           <YAxis
//             ticks={["100", "50", "100"]}
//             interval={0}
//             orientation="right"
//             tick={true}
//             tickSize={1}
//             tickLine={false}
//             tickMargin={10}
//           />
//           <Tooltip
//             allowEscapeViewBox={{ x: true, y: true }}
//             position={isDesktopScreen ? { x: 380, y: 0 } : {}}
//             content={(content) => (
//               <div className="bg-white absolute top-[261px] min-w-[93vw] md:min-w-0 md:h-[210px] md:w-[190px] md:left-[380px] md:top-[8px] left-[1px] p-2 md:p-4 rounded-md z-10">
//                 <div className="flex justify-between w-full border-b pb-2 mb-2 md:block md:pb-0 md:mb-0 md:border-none">
//                   {content.payload?.[0]?.payload?.homeTeamWinChance / 100 >= 0.5 ? (
//                     <div className="flex gap-1 font-[500] md:font-semibold">
//                       <h3 className="text-[12px] md:text-[16px]">
//                         {data.homeTeam.team.abbreviation}
//                       </h3>
//                       <h3 className="text-[12px] md:text-[16px]">{`${Number(
//                         content.payload?.[0]?.payload?.homeTeamWinChance
//                       ).toFixed(1)}%`}</h3>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex gap-1 font-[500] md:font-semibold">
//                         <h3 className="text-[12px] md:text-[16px]">
//                           {data.awayTeam.team.abbreviation}
//                         </h3>
//                         <h3 className="text-[12px] md:text-[16px]">{`${Number(
//                           100 - content.payload?.[0]?.payload?.homeTeamWinChance
//                         ).toFixed(1)}%`}</h3>
//                       </div>
//                     </>
//                   )}
//                   <h3 className="text-[11px] font-[500] md:mt-2 md:pb-2 md:mb-2 md:border-b border-[rgba(0,0,0,0.2)]">{`${data.awayTeam.team.abbreviation} ${content.payload?.[0]?.payload?.awayScore} - ${data.homeTeam.team.abbreviation} ${content.payload?.[0]?.payload?.homeScore}`}</h3>
//                 </div>

//                 <p className="text-[11px] opacity-80 font-[500]">
//                   {content.payload?.[0]?.payload?.gameClock} -{" "}
//                   {content.payload?.[0]?.payload?.quarter}
//                 </p>
//                 <p className="text-[11px] opacity-60 max-w-full overflow-hidden mt-1">
//                   {content.payload?.[0]?.payload?.playText}
//                 </p>
//               </div>
//             )}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//       <div
//         style={{ boxShadow: "2px 1px 10px 3px rgba(0,0,0,0.125)" }}
//         className="absolute md:h-[210px] min-w-[93%] md:min-w-0  mx-auto md:mx-0 md:w-[190px] md:left-[392px] md:top-[98px] bottom-[21px] left-[13px] bg-white p-2 md:p-4 rounded-md"
//       >
//         <div className="flex justify-between w-full border-b pb-2 mb-2 md:block md:pb-0 md:mb-0 md:border-none">
//           {finalDataPoint.homeTeamWinChance / 100 >= 0.5 ? (
//             <div className="flex gap-1 font-[500] md:font-semibold">
//               <h3 className="text-[12px] md:text-[16px]">{data.homeTeam.team.abbreviation}</h3>
//               <h3 className="text-[12px] md:text-[16px]">{`${Number(
//                 finalDataPoint.homeTeamWinChance
//               ).toFixed(1)}%`}</h3>
//             </div>
//           ) : (
//             <>
//               <div className="flex gap-1 font-[500] md:font-semibold">
//                 <h3 className="text-[12px] md:text-[16px]">{data.awayTeam.team.abbreviation}</h3>
//                 <h3 className="text-[12px] md:text-[16px]">{`${Number(
//                   100 - finalDataPoint.homeTeamWinChance
//                 ).toFixed(1)}%`}</h3>
//               </div>
//             </>
//           )}

//           <h3 className="text-[11px] font-[500] md:mt-2 md:pb-2 md:mb-2 md:border-b border-[rgba(0,0,0,0.2)]">{`${data.awayTeam.team.abbreviation} ${finalDataPoint.awayScore} - ${data.homeTeam.team.abbreviation} ${finalDataPoint.homeScore}`}</h3>
//         </div>

//         <p className="text-[11px] opacity-80 font-[500]">
//           {finalDataPoint.gameClock} - {finalDataPoint.quarter}
//         </p>
//         <p className="text-[11px] opacity-60 max-w-full overflow-hidden mt-1">
//           {finalDataPoint.playText}
//         </p>
//       </div>
//     </div>
//   );
// }
