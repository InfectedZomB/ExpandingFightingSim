import {Name} from "./Name";

/**
 * Class for managing Simpler name formats.
 */
export class SimpleName extends Name {

    private _name: string;
    private _nickname: string;

    /**
     * Constructor for the {@link SimpleName} class/
     * @param name Primary name.
     * @param nickname Nickname.
     */
    constructor(name: string, nickname?: string) {
        super();
        this._name = name;
        this._nickname = nickname ?? name;
    }

    /**
     * Gets the primary name.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Sets the primary name for the name.
     * @param value
     * @protected
     */
    protected set name(value: string) {
        this._name = value;
    }

    /**
     * Gets the nickname.
     * @protected
     */
    protected get nickname() {
        return this._nickname;
    }

    /**
     * Sets the nickname for the name.
     * @param value The new nickname.
     * @protected
     */
    protected set nickname(value: string) {
        this._nickname = value;
    }

    /**
     * Returns the name in a string format.
     */
    public toString(): string {
        return `${this.name} ${this.nickname}`
    }

}