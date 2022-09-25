import { Name } from "./Name";
import { Killable } from "../Utility/Killable";

/**
 * Class for managing {@link Object}s of {@link Fighter} type. Fighters attack each other. Last fighter alive wins.
 */
export class Fighter extends Killable {

    private _name: Name;

    /**
     * Creates a new {@link Object} of {@link Fighter} type.
     * @param name The {@link Fighter}'s {@link Name}.
     */
    public constructor(name: Name) {
        super();
        this._name = name;
    }

    /**
     * Returns the name of the fighter.
     */
    get name(): Name {
        return this._name;
    }

    /**
     * Sets the name of the fighter.
     * @param value The new name of the fighter.
     */
    set name(value: Name) {
        this._name = value;
    }

    /**
     * Returns a string form of the {@link Fighter}.
     */
    public toString(): string {
        let output = this.name.toString();
        output += `\nAlive: ${this.alive}\n`;
        return output;
    }

    /**
     * Attacks an opponent.
     * @param opponent The opponent attacked.
     */
    public attack(opponent: Killable) {
        if(this.alive) opponent.kill();
    }

    /**
     * Kills the {@link Fighter}.
     */
    public kill() {
        if(this.alive) {
            this.alive = false;
            console.log(`${this.name.preferredName} has died.`);
        }
    }

    /**
     * Resets the {@link Fighter} to a living state.
     */
    public reset() {
        this.alive = true;
    }
}