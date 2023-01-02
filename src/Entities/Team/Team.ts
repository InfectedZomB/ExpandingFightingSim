import adj from './adj.json';
import noun from './noun.json';
import {Style} from "../../Utility/Style";
import {Color} from "../../Utility/Color";

//import test from './test.json';

/**
 * Class for managing who is friendly and hostile to each-other.
 */
export class Team {

    private static teams: Team[] = [];
    public static monsterTeam: Team = new Team("Monsters");
    private static readonly INIT_TEAMS = Team.teams.length;
    private static readonly REFRESH_LIMIT = 10;

    private _allies: Team[];
    private _id: string;
    private _style: Style;

    /**
     * Constructor for the {@link Team} class
     * @param id Pre-made ID for the Team. If none is entered, one will be generated.
     * @param allies List of allied teams.
     */
    public constructor(id?: string, ...allies: Team[]) {
        this._id = id ?? Team.randomTeamID;
        this.ensureUniqueID();
        this._allies = allies;
        Team.teams.push(this);
        id === "Monsters" ?
            this._style = new Style(null, new Color(255, 0, 0)) :
            this._style = new Style();
    }

    /**
     * Generates a random team ID from adj.json and noun.json.
     * @private No need for method outside of class.
     */
    private static get randomTeamID(): string {
        return `${adj[Math.floor(Math.random() * adj.length)]} ${noun[Math.floor(Math.random() * noun.length)]}`;
        //return `${test[Math.floor(Math.random() * test.length)]} ${test[Math.floor(Math.random() * test.length)]}`;
    }

    /**
     * The list of all existing teams.
     */
    public static get globalTeamList(): Readonly<Team[]> {
        return Object.freeze([...Team.teams]);
    }

    /**
     * Get a random team that is not a pre-initialized team.
     */
    public static get randomTeam(): Team {
        if(Team.globalTeamList.length == Team.INIT_TEAMS) return new Team();
        else return Team.globalTeamList[Math.floor(Math.random() * (Team.globalTeamList.length - Team.INIT_TEAMS)) + Team.INIT_TEAMS];
    }

    /**
     * Ensures each team has a unique ID following 3 plans.
     * It will attempt to generate a random unique name using a combination from adj.json and noun.json.
     * After {@link REFRESH_LIMIT} attempts, the ID will simply be the number of existing teams.
     * If, for whatever reason, this still matches an ID, it will randomly generate a number and use that.
     * @private No need for method outside of class.
     */
    private ensureUniqueID() {
        let match: boolean;
        let failedRefreshes: number = 0;

        //Assign a random name from the JSON files and check if it's unique
        do {
            match = false;
            for(let team of Team.teams) {
                if(this._id === team._id) {
                    match = true;
                    break;
                }
            }
            if(match) {
                this._id = Team.randomTeamID;
                failedRefreshes++;
            }
        } while(match && failedRefreshes < Team.REFRESH_LIMIT);

        //If no unique responses in REFRESH_LIMIT attempts, set to the length of the globalTeamList array.
        if(failedRefreshes >= Team.REFRESH_LIMIT) this._id = `${Team.globalTeamList.length}`;

        //Ensure this ID is unique. If not, generate new numbers until it is.
        do {
            match = false;
            for(let team of Team.teams) {
                if(this._id === team._id) {
                    match = true;
                    break;
                }
            }
            if(match) {
                this._id = `${Math.floor(Math.random() * Math.pow(10, Math.log10(Team.globalTeamList.length + failedRefreshes)))}`;
                failedRefreshes++;
            }
        } while(match);
    }

    /**
     * Gets the ID of the team.
     */
    public get id(): string {
        return Style.styledString(this._id, this._style);
    }

    /**
     * Sets the ID of the team.
     * @param value The new string id.
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Gets the list of current allies.
     */
    public get allies(): Team[] {
        return [...this._allies];
    }

    /**
     * Sets the list of allies.
     * @param value The new list of allies.
     */
    public set allies(value: Team[]) {
        this._allies = value;
    }

    /**
     * The style values of the team.
     */
    public get style(): Style {
        return this._style;
    }

    /**
     * Sets the style values of the team.
     * @param value The new ColorStyle
     */
    public set style(value: Style) {
        this._style = value;
    }

    /**
     * Adds an ally to the team.
     * @param team New allied team.
     */
    public addAlly(team: Team) {
        this._allies.push(team);
    }

    /**
     * Symmetrically adds this team and the param team to each other's allies.
     * @param team New allied team.
     */
    public addAllySymmetric(team: Team) {
        this._allies.push(team);
        team._allies.push(this);
    }

}