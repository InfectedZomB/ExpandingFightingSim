import {Killable} from "./Killable";
import {SimpleName} from "../Name/SimpleName";
import {Team} from "../Team/Team";
import {Style} from "../../Utility/Style";
import {Color} from "../../Utility/Color";

/**
 * Class for managing a simple type of Killable that has a name and simple health value.
 */
export class Monster extends Killable {

    private _name: SimpleName;
    private _health: number;
    private _maxHealth: number;

    /**
     * Constructor for the {@link Monster} class.
     * @param name Name of the Monster.
     * @param health Standard health and max health value.
     * @param team The starting team of the Monster.
     * @param alive Whether the monster begins alive.
     */
    constructor(name: string, health: number, team?: Team, alive?: boolean) {
        super(team ?? Team.monsterTeam, alive ?? true);
        this._name = new SimpleName(name);
        let usableHealth = Math.ceil(health);
        this._maxHealth = usableHealth;
        this._health = usableHealth;
    }

    /**
     * Gets the name for the Monster.
     */
    get name(): SimpleName {
        return this._name;
    }

    /**
     * Sets the new name for the Monster
     * @param value The new {@link SimpleName} for the Monster.
     */
    set name(value: SimpleName) {
        this._name = value;
    }

    /**
     * Gets the health value.
     */
    get health(): number {
        return this._health;
    }

    /**
     * Sets the health value.
     * @param value The new health value. Cannot be higher than max health.
     */
    set health(value: number) {
        this._health = Math.min(Math.ceil(value), this._maxHealth);
    }

    /**
     * Gets the max health value.
     */
    get maxHealth(): number {
        return this._maxHealth;
    }

    /**
     * Sets the maximum health value.
     * @param value The new max health value.
     */
    set maxHealth(value: number) {
        this._maxHealth = Math.ceil(value);
        this._health = Math.min(this._health, this._maxHealth);
    }

    /**
     * Returns the identifier for the Monster as a string: <Name> <Team ID>
     */
    public get identifier() {
        if(this.team === Team.monsterTeam) return `${Style.styledString(this.name.name, new Style("b", new Color(255, 0, 0)))}`;
        else return `${Style.styledString(this.name.name, this.style)} of the ${this.team.id}`;
    }

    /**
     * Attacks an opponent.
     * @param opponent The opponent attacked.
     */
    attack(opponent: Killable) {
        opponent.attacked(this);
    }

    /**
     * Get attacked by an opponent.
     * @param opponent The opponent who attacks.
     * @param args Any added arguments to the attack.
     */
    attacked(opponent: Killable, ...args: any[]) {
        if(this.health > 0) this.health--;
        if(this.health == 0) this.kill();
    }

    /**
     * Kills the Monster.
     */
    kill() {
        if(this.alive) {
            this.alive = false;
            console.log(`${this.identifier} has died.\n`);
        }
    }

    /**
     * Resets the Monster to a base form.
     */
    reset() {
        this.alive = true;
        this._health = this._maxHealth;
    }

    /**
     * Returns a string representation of the Monster
     */
    toString(): string {
        return `Name: ${this.name.toString()}, Health: ${this.health}, Team: ${this.team.id}`;
    }

}