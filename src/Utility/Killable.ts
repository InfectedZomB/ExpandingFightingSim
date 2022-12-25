import {Resettable} from "./Resettable";
import {Stringable} from "./Stringable";

/**
 * Class for managing the ability to kill.
 */
export abstract class Killable implements Resettable, Stringable {

    private _alive: boolean;
    private _team: string;

    /**
     * Constructor for {@link Killable} objects.
     * @param team The team that the Killable is on. Will not attack friendlies.
     * @protected So that only extended objects may access.
     */
    protected constructor(team?: string, alive?: boolean) {
        this._alive = alive ?? true;
        this._team = team ?? "";
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

