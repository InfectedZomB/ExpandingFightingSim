import {Name} from "./Name";

/**
 * Type to manage components of names.
 * name: The string name part of a name.
 * use: Whether the string name part should be used when displaying the name.
 */

export type NameComponent = {
    name: string;
    use: boolean;
};

/**
 * Class to give formal names to Fighters.
 *
 * Names consist of a First, Last and Nickname as a string.
 *
 * Names consist of a string array of Middle names.
 */
export class ComplexName extends Name {

    private _firstName: NameComponent;
    private _lastName: NameComponent;
    private _nickName: NameComponent;
    private _middleNames: NameComponent[];

    /**
     * Create an {@link Object} of {@link ComplexName} type.
     * @param firstName First name as a string or NameComponent.
     * @param lastName Last name as a string or NameComponent.
     * @param nickName Nick-name as a string or NameComponent (Optional).
     * @param middleNames List of Middle names as a string[] or NameComponent[] (Optional).
     */
    public constructor(firstName: string | NameComponent, lastName: string | NameComponent,
                       nickName?: string | NameComponent, ...middleNames: string[] | NameComponent[]) {
        super();
        typeof firstName == "string" ? this._firstName = {name: firstName, use: true} : this._firstName = firstName;
        typeof lastName == "string" ? this._lastName = {name: lastName, use: true} : this._lastName = lastName;
        typeof nickName == "string" ? this._nickName = {name: nickName, use: true} : this._nickName = nickName;
        if(middleNames.length > 0 && typeof middleNames[0] == "string") {
            let nameCompArray: NameComponent[] = [];
            for(let name of middleNames) nameCompArray.push({name: name as string, use: true});
            this._middleNames = nameCompArray;
        }
        else this._middleNames = middleNames as NameComponent[];
    }

    /**
     * Returns the first name.
     */
    protected get firstName(): Readonly<NameComponent> {
        return Object.freeze({...this._firstName});
    }

    /**
     * Sets the first name.
     * @param value New first name.
     */
    protected set firstName(value: NameComponent) {
        this._firstName = value;
    }

    /**
     * Returns the last name.
     */
    protected get lastName(): Readonly<NameComponent> {
        return Object.freeze({...this._lastName});
    }

    /**
     * Sets the last name.
     * @param value New last name.
     */
    protected set lastName(value: NameComponent) {
        this._lastName = value;
    }

    /**
     * Returns the nickname.
     */
    protected get nickName(): Readonly<NameComponent> {
        return Object.freeze({...this._nickName});
    }

    /**
     * Sets the nickname.
     * @param value The new nickname.
     */
    protected set nickName(value: NameComponent) {
        this._nickName = value;
    }

    /**
     * Returns all the middle names as a string array.
     */
    protected get middleNames(): NameComponent[] {
        return [...this._middleNames];
    }

    /**
     * Sets all the middle names.
     * @param value The new list of middle names.
     */
    protected set middleNames(value: NameComponent[]) {
        this._middleNames = value;
    }

    /**
     * Returns the middle name at the index of the list.
     * @param index The index of the list.
     */
    protected middleName(index: number): Readonly<NameComponent> {
        if(this.middleNames.length == 0) throw new RangeError(`No middle names exist for ${this.toString()}.`);
        if(index < 0 || index >= this.middleNames.length) throw new RangeError(`Index ${index} is out of bounds of 0 ` +
            `- ${this.middleNames.length - 1}`);
        return Object.freeze({...this.middleNames[index]});
    }

    /**
     * Returns the exact preferred name.
     */
    public get name(): string {
        let names: string[] = []
        if(this.firstName.use) names.push(this.firstName.name);
        for(let name of this.middleNames) if(name.use) names.push(name.name);
        if(this.nickName.use) names.push(`\"${this.nickName.name}\"`);
        if(this.lastName.use) names.push(this.lastName.name);
        if(names.length == 0) names.push(this.firstName.name);
        let finalName: string = "";
        let nameAdded: boolean = false;
        for(let name of names) {
            if(nameAdded) finalName += " ";
            finalName += name;
            nameAdded = true;
        }
        return finalName;
    }

    /**
     * Returns the full name, including the nickname and all middle names.
     */
    public toString(): string {
        let names: string[] = []
        names.push(this.firstName.name);
        for(let name of this.middleNames) names.push(name.name);
        if(this.nickName != null) names.push(`\"${this.nickName.name}\"`);
        names.push(this.lastName.name);
        let finalName: string = "";
        let nameAdded: boolean = false;
        for(let name of names) {
            if(nameAdded) finalName += " ";
            finalName += name;
            nameAdded = true;
        }
        return finalName;
    }
}