import {Color} from "./Color";

/**
 * Type for managing the line of boolean values a style contains.
 */
export type StyleComponent = {
    bold: boolean;
    italic: boolean;
    underline: boolean;
};

/**
 * Class for managing styles for printing into the console.
 */
export class Style {

    private _fill: Color | null;
    private _highlight: Color | null;
    private _bold: boolean;
    private _italic: boolean;
    private _underline: boolean;

    /**
     * Constructs an instance of the {@link Style} class, which manages how strings are printed into the console.
     * @param args Small string meant for quickly determining which of the style components start enabled. "b" = Bold. "i" = Italic. "u" = Underline.
     * @param fill Fill color for the text.
     * @param highlight Highlight of the text.
     */
    constructor(args?: string | null, fill?: Color | null, highlight?: Color | null) {
        args = args ?? null;
        this._bold = false;
        this._italic = false;
        this._underline = false;
        if(args != null) for(let i = 0; i < Math.min(args.length, 3); i++) {
            if(args[i] == 'b') this._bold = true;
            else if(args[i] == 'i') this._italic = true;
            else if(args[i] == 'u') this._underline = true;
        }
        this._fill = fill ?? null;
        this._highlight = highlight ?? null;
    }

    /**
     * Fill color of the text.
     */
    get fill(): Color {
        return this._fill;
    }

    /**
     * Sets the fill color of the text.
     * @param value The new fill color.
     */
    set fill(value: Color) {
        this._fill = value;
    }

    /**
     * Highlight of the text.
     */
    get highlight(): Color {
        return this._highlight;
    }

    /**
     * Sets the highlight of the text.
     * @param value The new highlight color.
     */
    set highlight(value: Color) {
        this._highlight = value;
    }

    /**
     * The boolean components of the style.
     */
    get styleComponent(): StyleComponent {
        return {
            bold: this._bold,
            italic: this._italic,
            underline: this._underline
        };
    }

    /**
     * Sets the boolean components of the style.
     * @param value The new boolean components.
     */
    set styleComponent(value: StyleComponent) {
        this._bold = value.bold;
        this._italic = value.italic;
        this._underline = value.underline;
    }

    /**
     * Returns the styled string as the style specifies.
     * @param value The base string to be styled.
     * @param style The style object.
     */
    public static styledString(value: string, style: Style): string {
        let prefix = "";
        if(style.fill != null) prefix += `\x1b[38;2;${style.fill.r};${style.fill.g};${style.fill.b}m`;
        if(style.highlight != null) prefix += `\x1b[48;2;${style.highlight.r};${style.highlight.g};${style.highlight.b}m`;
        if(style._bold) prefix += "\x1b[1m";
        if(style._italic) prefix += "\x1b[3m";
        if(style._underline) prefix += "\x1b[4m";
        return `${prefix}${value}\x1b[0m`;
    }

}