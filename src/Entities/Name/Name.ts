import {IStringable} from "../../Utility/IStringable";

/**
 * Class for ensuring all name types can simply get a name.
 */
export abstract class Name implements IStringable {

    /**
     * Returns name.
     */
    public abstract get name();

}