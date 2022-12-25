import {Stringable} from "../../Utility/Stringable";

/**
 * Class for ensuring all name types can simply get a name.
 */
export abstract class Name implements Stringable {

    /**
     * Returns name.
     */
    public abstract get name();

}