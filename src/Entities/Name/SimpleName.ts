import {Name} from "./Name";

export class SimpleName extends Name {

    private _name: string;
    private _nickname: string;

    constructor(name: string, nickname?: string) {
        super();
        this._name = name;
        this._nickname = nickname ?? name;
    }

    public get name(): string {
        return this._name;
    }

    protected set name(value: string) {
        this._name = value;
    }

    protected get nickname() {
        return this._nickname;
    }

    protected set nickname(value: string) {
        this._nickname = value;
    }

    public toString(): string {
        return `${this.name} ${this.nickname}`
    }

}