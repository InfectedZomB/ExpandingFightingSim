import {Resettable} from "./Resettable";
import {Stringable} from "./Stringable";

/**
 * Class for managing the ability to kill.
 */
export abstract class Killable implements Resettable, Stringable {

    private _alive: boolean;

    /**
     * Constructor for {@link Killable} objects.
     * @protected So that only extended objects may access.
     */
    protected constructor() {
        this._alive = true;
    }

    /**
     * Returns whether or not the Killable is alive.
     */
    get alive(): boolean {
        return this._alive;
    }

    /**
     * Sets whether or not the killable is alive.
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

