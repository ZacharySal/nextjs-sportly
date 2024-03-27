import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { JSX } from "react";

export default function FullTeamStats({ data }: { data: any }) {
  const view = () => {
    const els: JSX.Element[] = [];
    Object.entries(data.fullTeamStats).map(([key, value]: [string, any]) =>
      els.push(
        <table key={uuidv4()} className="stat-table table border-collapse">
          <thead>
            <tr className="table-header">
              <th className="table-header uppercase" colSpan={2} align="left">
                {key}
              </th>
              <th className="table-header w-[5rem]" align="right">
                <div className="flex flex-row items-center justify-end gap-1">
                  <Image
                    src={data.teamData.team.logos[0].href}
                    width={data.teamData.team.logos[0].width}
                    height={data.teamData.team.logos[0].height}
                    alt=""
                    className="w-5 object-contain"
                  />
                  {data.teamData.team.abbreviation}
                </div>
              </th>
              <th className="table-header w-[6rem]" align="right">
                Rank
              </th>
            </tr>
          </thead>
          <tbody>
            {value.map((stat: any) => (
              <tr key={uuidv4()}>
                <td className="t-table-cell text-xs" align="left" colSpan={2}>
                  {stat.displayName}
                </td>
                <td className="t-table-cell text-xs" align="right">
                  {stat.displayValue}
                </td>
                <td className="t-table-cell text-xs" align="right">
                  {stat.rankDisplayValue
                    ? stat.rankDisplayValue.replaceAll("Tied", "T")
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>,
      ),
    );
    return els;
  };
  return (
    <div className="w-full rounded-xl bg-white p-3">
      <p className="mb-4 text-xl font-semibold opacity-90 md:text-2xl">
        {data.teamData.team.displayName} 2023 Statistics
      </p>
      {view()}
    </div>
  );
}
