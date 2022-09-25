import {Stringable} from "../Utility/Stringable";

/**
 * Class to give formal names to Fighters.
 *
 * Names consist of a First, Last and Nickname as a string.
 *
 * Names consist of a string array of Middle names.
 */
export class Name implements Stringable {

    private _firstName: string;
    private _lastName: string;
    private _nickName: string;
    private _middleNames: string[];

    /**
     * Create an {@link Object} of {@link Name} type.
     * @param firstName First name as a string.
     * @param lastName Last name as a string.
     * @param nickName Nick-name as a string.
     * @param middleNames List of Middle names as a string array.
     */
    public constructor(firstName: string, lastName: string, nickName?:string, ...middleNames: string[]) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._nickName = nickName ?? firstName;
        this._middleNames = middleNames;
    }

    /**
     * Returns the first name.
     */
    get firstName(): string {
        return this._firstName;
    }

    /**
     * Sets the first name.
     * @param value New first name.
     */
    set firstName(value: string) {
        this._firstName = value;
    }

    /**
     * Returns the last name.
     */
    get lastName(): string {
        return this._lastName;
    }

    /**
     * Sets the last name.
     * @param value New last name.
     */
    set lastName(value: string) {
        this._lastName = value;
    }

    /**
     * Returns the nick-name.
     */
    get nickName(): string {
        return this._nickName;
    }

    /**
     * Sets the nick-name.
     * @param value The new nick-name.
     */
    set nickName(value: string) {
        this._nickName = value;
    }

    /**
     * Returns all the middle names as a string array.
     */
    get middleNames(): string[] {
        return this._middleNames;
    }

    /**
     * Sets all the middle names.
     * @param value The new list of middle names.
     */
    set middleNames(value: string[]) {
        this._middleNames = value;
    }

    /**
     * Returns the middle name at the index of the list.
     * @param index The index of the list.
     */
    public middleName(index: number): string {
        if (this.middleNames.length == 0) throw new RangeError(`No middle names exist for ${this.toString()}.`);
        if (index < 0 || index >= this.middleNames.length) throw new RangeError(`Index ${index} is out of bounds of 0 - ${this.middleNames.length}`);
        return this.middleNames[index];
    }

    /**
     * Returns the full name, ignoring the nick-name.
     */
    public fullName(): string {
        if(this.middleNames.length == 0) return `${this.firstName} ${this.lastName}`;
        let middleNames = "";
        for(let i = 0; i < this.middleNames.length; i++) {
            middleNames += this.middleNames[i];
            middleNames += " ";
        }
        return `${this.firstName} ${middleNames}${this.lastName}`;
    }

    /**
     * Returns the full name, including the nick-name.
     */
    public toString(): string {
        if(this.firstName === this.nickName) return this.fullName();
        else {
            if(this.middleNames.length == 0) return `${this.firstName} \"${this.nickName}\" ${this.lastName}`;
            let middleNames = "";
            for(let i = 0; i < this.middleNames.length; i++) {
                middleNames += this.middleNames[i];
                middleNames += " ";
            }
            return `${this.firstName} \"${this.nickName}\" ${middleNames}${this.lastName}`;
        }
    }
}