import {Killable} from "../Entities/Killable/Killable";
import {IResettable} from "./IResettable";
import {IStringable} from "./IStringable";

/**
 * Class for managing {@link Match}es between {@link Killable} entities.
 */
export class Match implements IResettable, IStringable {

    private _contestants: Killable[];
    private turn: number;
    private _finished: boolean;

    /**
     * Constructor for initializing a match between multiple contestants.
     * @param contestants The contestants fighting in the match.
     */
    public constructor(...contestants: Killable[]) {
        this._contestants = contestants;
        this.turn = 0;
        this.initialize();
    }

    /**
     * Returns the list of contestants in the match.
     */
    get contestants(): Killable[] {
        return [...this._contestants];
    }

    /**
     * Sets the list of contestants in the match.
     * @param value The new list of contestants.
     */
    set contestants(value: Killable[]) {
        this._contestants = value;
        if(!this.verifyMatch()) this.finish();
    }

    /**
     * Completes the next turn in the match.
     */
    public nextTurn() {
        if(this.finished) {
            if(this.winners != null) {
                if(this.winners.length == 1) console.log(`Match is already over. The winner is: ${this.winners[0].identifier}`);
                else {
                    console.log("Match is already over. The winners are:");
                    for(let winner of this.winners) console.log(`\t${winner.identifier}`);
                }
            }
            else console.log("Match is already over. No winner.");
        }
        else {
            if(this.verifyMatch()) {
                let attacker = this.livingContestants[this.turn % this.livingContestants.length];
                //let defender = this.livingContestants[(this.turn + 1) % this.livingContestants.length];
                let defender: Killable;
                for(let i = 1; i < this.livingContestants.length; i++) {
                    defender = this.livingContestants[(this.turn + i) % this.livingContestants.length];
                    if(attacker.verifyTarget(defender)) break;
                }
                let attName = attacker.identifier;
                let defName = defender.identifier;
                console.log(`${attName}\n-has attacked-\n${defName}\n`);
                attacker.attack(defender);
                this.turn++;
            }
            else this.finish();
        }
    }

    /**
     * Initialize the match. If there are too few contestants alive or all alive contestants are friendly, the match will initialize finished.
     */
    public initialize() {
        if(this.verifyMatch()) {
            this.finished = false;
            this.randomizeContestantOrder();
        }
        else {
            this.finish();
            console.log(`Cannot start match: ${this.livingContestants.length < 2 ? "Too few living contestants." : "All living contestants are friendly."}`);
        }
    }

    /**
     * Resets the match and all contestants.
     */
    public reset() {
        for(let contestant of this.contestants) contestant.reset();
        this.turn = 0;
        this.initialize();
    }

    /**
     * Returns a list of all living contestants.
     */
    get livingContestants(): Killable[] {
        let livingContestants: Killable[] = [];
        for(let contestant of this.contestants) if(contestant.alive) livingContestants.push(contestant);
        return livingContestants;
    }

    /**
     * Returns whether the match is finished.
     */
    get finished(): boolean {
        return this._finished;
    }

    /**
     * Sets whether the match is finished.
     * @param value The new value.
     * @private No use outside of {@link Match} class.
     */
    private set finished(value: boolean) {
        this._finished = value;
    }

    /**
     * Returns the winners of the match. If there is no current winner, returns null.
     */
    get winners(): Killable[] | null {
        if(this.finished && this.livingContestants.length > 0) return this.livingContestants;
        else return null;
    }

    /**
     * Returns the match in a string format.
     */
    public toString(): string {
        let output = "Match: {\n";
        for(let contestant of this.contestants) output += contestant.toString();
        output += "}\n";
        return output;
    }

    /**
     * Officially finish a match.
     * @private No use for function outside this class.
     */
    private finish() {
        this.finished = true;
        if(this.winners != null) {
            if(this.winners.length == 1) console.log(`The winner is: ${this.winners[0].identifier}`);
            else {
                console.log("The winners are:");
                for(let winner of this.winners) console.log(`\t${winner.identifier}`);
            }
        }
        else console.log("No winner.");
    }

    /**
     * Randomizes the order of the match.
     * @private No use for function outside this class.
     */
    private randomizeContestantOrder() {
        let contestants = [...this.contestants];
        let randomizedContestants: Killable[] = [];
        let index: number;
        while(contestants.length > 0) {
            index = Math.floor(Math.random() * contestants.length);
            randomizedContestants.push(contestants[index]);
            contestants.splice(index, 1);
        }
        this.contestants = randomizedContestants;
    }

    /**
     * Verifies if a match still has fighting to be done.
     * @private Does not need to be used outside of class.
     * @return Returns true if there is a verified target, otherwise returns false.
     */
    private verifyMatch(): boolean {
        let livingContestants = this.livingContestants;
        if(livingContestants.length < 2) return false;
        let hostileFlag = false;
        for(let cont of livingContestants) for(let opponent of livingContestants) {
            hostileFlag = cont.verifyTarget(opponent);
            if(hostileFlag == true) break;
        }
        return hostileFlag;
    }

}