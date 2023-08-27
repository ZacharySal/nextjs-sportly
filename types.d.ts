export type GameInfoType = {
    date: string;
    uuid: string;
    week: {};
    name: string;
    competitions: [
        {
            date: string,
            competitors: [
                {
                    uid: string | undefined,
                    score: string,
                    id:string,
                    team: {
                        name: string
                    }
                },
                {
                    uid: string,
                    score: string
                    id:string,
                    team: {
                        name: string
                    }
                }
            ]
        },
        
    ];
    season: {};
    links: [];
    id: string;
    shortName: string;
    status: {
        type: {
            description: string,
        }
    };
}