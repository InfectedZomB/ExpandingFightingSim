import {Killable} from "../Utility/Killable";
import {SimpleName} from "./Name/SimpleName";

export class Monster extends Killable {

    private _name: SimpleName;
    private _health: number;
    private _maxHealth: number;

    constructor(name: string, health: number) {
        super();
        this._name = new SimpleName(name);
        let usableHealth = Math.ceil(health);
        this._maxHealth = usableHealth;
        this._health = usableHealth;
    }

    get name(): SimpleName {
        return this._name;
    }

    set name(value: SimpleName) {
        this._name = value;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = Math.min(Math.ceil(value), this._maxHealth);
    }

    get maxHealth(): number {
        return this._maxHealth;
    }

    set maxHealth(value: number) {
        this._maxHealth = Math.ceil(value);
        this._health = Math.min(this._health, this._maxHealth);
    }

    attack(opponent: Killable) {
        opponent.attacked(this);
    }

    attacked(opponent: Killable, ...args: any[]) {
        if(this.health > 0) this.health--;
        if(this.health == 0) this.kill();
    }

    kill() {
        if(this.alive) {
            this.alive = false;
            console.log(`${this.name.name} has died.\n`);
        }
    }

    reset() {
        this.alive = true;
        this._health = this._maxHealth;
    }

    toString(): string {
        return `Name: ${this.name.toString()}, Health: ${this.health}`;
    }

}