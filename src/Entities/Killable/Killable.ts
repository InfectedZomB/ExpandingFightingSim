import {IResettable} from "../../Utility/IResettable";
import {IStringable} from "../../Utility/IStringable";
import {Team} from "../Team/Team";
import {Style} from "../../Utility/Style";

/**
 * Class for managing the ability to kill.
 */
export abstract class Killable implements IResettable, IStringable {

    private _alive: boolean;
    private _team: Team;
    private _style: Style;

    /**
     * Constructor for {@link Killable} objects.
     * @param team The team that the Killable is on. Will not attack friendlies.
     * @param alive Whether the Killable will begin alive.
     * @param style The style associated to the Killable.
     * @protected So that only extended objects may access.
     */
    protected constructor(team?: Team, alive?: boolean, style?: Style) {
        this._alive = alive ?? true;
        this._team = team ?? new Team();
        this._style = style ?? new Style();
    }

    /**
     * Returns whether the Killable is alive.
     */
    get alive(): boolean {
        return this._alive;
    }

    /**
     * Sets whether the killable is alive.
     * @param value The new value of life.
     */
    set alive(value: boolean) {
        this._alive = value;
    }

    /**
     * Returns the {@link Team} of the Killable.
     */
    get team(): Team {
        return this._team;
    }

    /**
     * Sets the {@link Team} of the Killable.
     * @param value The new team.
     */
    set team(value: Team) {
        this._team = value;
    }

    /**
     * The style of the killable.
     */
    get style(): Style {
        return this._style;
    }

    /**
     * Sets the {@link Style} of the killable.
     * @param value The new ColorStyle.
     */
    set style(value: Style) {
        this._style = value;
    }

    /**
     * Verifies that the attacker is hostile toward the defender.
     * @param defender The defender.
     */
    public verifyTarget(defender: Killable): boolean {
        let hostileFlag = false;
        if(this.team != defender.team) {
            hostileFlag = true;
            for(let ally of this.team.allies) if(ally === defender.team) hostileFlag = false;
        }
        return hostileFlag;
    }

    /**
     * Returns the identifier for the Killable, typically a name and their team.
     */
    public abstract get identifier(): string;

    /**
     * Attacks an opponent.
     * @param opponent The opponent attacked.
     */
    abstract attack(opponent: Killable);

    /**
     * Get attacked by an opponent.
     * @param opponent The opponent who attacks.
     * @param args Any added arguments to the attack.
     */
    abstract attacked(opponent: Killable, ...args: any[]);

    /**
     * Kills the Killable {@link Object}.
     */
    abstract kill();

    /**
     * Resets the Killable {@link Object}.
     */
    abstract reset();

    /**
     * Returns the Killable in a string form.
     */
    abstract toString(): string;

}

