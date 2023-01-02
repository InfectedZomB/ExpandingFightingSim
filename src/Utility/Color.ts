/**
 * Class for managing a color in an RGB form.
 */
export class Color {

    private _r: number;
    private _g: number;
    private _b: number;

    /**
     * Constructs an object of the {@link Color} class. Contains an r, g, and b value.
     * @param r Red value, between 0 - 255.
     * @param g Green value, between 0 - 255.
     * @param b Blue value, between 0 - 255.
     */
    constructor(r: number, g: number, b: number) {
        for(let value of [r, g, b]) {
            if(value > 255 || value < 0) throw new Error("RGB Values must be 0 - 255.");
            if(!Number.isInteger(value)) throw new Error("RGB values must be integers.");
        }
        this._r = r;
        this._g = g;
        this._b = b;
    }

    /**
     * Red value.
     */
    get r() {
        return this._r;
    }

    /**
     * Sets the red value.
     * @param value New red value.
     */
    set r(value: number) {
        if(value > 255 || value < 0) throw new Error("RGB Values must be 0 - 255.");
        if(!Number.isInteger(value)) throw new Error("RGB values must be integers.");
        this._r = value;
    }

    /**
     * Green value.
     */
    get g() {
        return this._g;
    }

    /**
     * Sets the green value.
     * @param value New green value.
     */
    set g(value: number) {
        if(value > 255 || value < 0) throw new Error("RGB Values must be 0 - 255.");
        if(!Number.isInteger(value)) throw new Error("RGB values must be integers.");
        this._g = value;
    }

    /**
     * Blue value.
     */
    get b() {
        return this._b;
    }

    /**
     * New blue value.
     * @param value New blue value.
     */
    set b(value: number) {
        if(value > 255 || value < 0) throw new Error("RGB Values must be 0 - 255.");
        if(!Number.isInteger(value)) throw new Error("RGB values must be integers.");
        this._b = value;
    }

    /**
     * Generates and returns a random RGB Color.
     */
    public static randomColor(): Color {
        return new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    }

}