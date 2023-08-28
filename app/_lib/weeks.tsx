export async function getNflWeeks(year: string) {
  const response = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}`
  );

  const seasonInfo = await response.json();

  const seasons = seasonInfo.types.items.map(
    (seasonType: { name: string; $ref: string }) => {
      return {
        name: seasonType.name,
        linkToWeeks: seasonType.$ref,
        weeks: [],
      };
    }
  );

  for (let season of seasons) {
    const response = await fetch(season.linkToWeeks);
    const data = await response.json();

    const newResponse = await fetch(data.weeks["$ref"]);
    const newData = await newResponse.json();
    const allWeekLinks = newData.items;

    for (let link of allWeekLinks) {
      const response = await fetch(link["$ref"]);
      const data = await response.json();

      season.weeks.push({
        startDate: data.startDate,
        endDate: data.endDate,
        text: data.text,
        weekNumber: data.number,
      });
    }
  }

  return seasons;
}
