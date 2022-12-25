//import adj from 'adj.json';
//import noun from 'noun.json';

export class Team {

    private static teams: Team[];

    private _allies: Team[];
    private _id: string;

    constructor(id?: string, ...allies: Team[]) {
        this._id = id ?? Team.randomTeamID;
        this._allies = allies;
    }

    private static get randomTeamID(): string {
        return "Test";
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

}