import { ComplexName } from "./Name/ComplexName";
import { Killable } from "../Utility/Killable";

/**
 * Class for managing {@link Object}s of {@link Fighter} type. Fighters attack each other. Last fighter alive wins.
 */
export class Fighter extends Killable {

    private _name: ComplexName;

    /**
     * Creates a new {@link Object} of {@link Fighter} type.
     * @param name The {@link Fighter}'s {@link ComplexName}.
     */
    public constructor(name: ComplexName) {
        super();
        this._name = name;
    }

    /**
     * Returns the name of the fighter.
     */
    get name(): ComplexName {
        return this._name;
    }

    /**
     * Sets the name of the fighter.
     * @param value The new name of the fighter.
     */
    set name(value: ComplexName) {
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
        if(this.alive) opponent.attacked(this);
    }

    /**
     * Get attacked by an opponent.
     * @param opponent The opponent who attacks.
     * @param args Any added arguments to the attack.
     */
    public attacked(opponent: Killable, ...args) {
        this.kill();
    }

    /**
     * Kills the {@link Fighter}.
     */
    public kill() {
        if(this.alive) {
            this.alive = false;
            console.log(`${this.name.name} has died.\n`);
        }
    }

    /**
     * Resets the {@link Fighter} to a living state.
     */
    public reset() {
        this.alive = true;
    }
}