import {Killable} from "./Killable";
import {Resettable} from "./Resettable";
import {Stringable} from "./Stringable";
import {Fighter} from "../Entities/Fighter";

/**
 * Class for managing {@link Match}es between {@link Killable} entities.
 */
export class Match implements Resettable, Stringable {

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
        return this._contestants;
    }

    /**
     * Sets the list of contestants in the match.
     * @param value The new list of contestants.
     */
    set contestants(value: Killable[]) {
        this._contestants = value;
        if(this.livingContestants.length < 2) this.finish();
    }

    /**
     * Completes the next turn in the match.
     */
    public nextTurn() {
        if(this.finished) {
            let winner: Killable | null;
            for(let contestant of this.contestants) if(contestant.alive) winner = contestant;
            winner == null ? console.log("The match has already ended. No winners.") : console.log(`The match has already ended. Winner:\n${winner.toString()}`);
        }
        else {
            if(this.livingContestants.length >= 2) {
                let attacker = this.livingContestants[this.turn % this.livingContestants.length];
                let defender = this.livingContestants[(this.turn + 1) % this.livingContestants.length];
                let attName = attacker instanceof Fighter ? ((attacker as Fighter).name.preferredName + "\n") : typeof attacker;
                let defName = defender instanceof Fighter ? ((defender as Fighter).name.preferredName + "\n") : typeof defender;
                console.log(`${attName}-has attacked-\n${defName}`);
                attacker.attack(defender);
                this.turn++;
            }
            else this.finish();
        }
    }

    /**
     * Initialize the match. If there are too few contestants alive, the match will initialize finished.
     */
    public initialize() {
        let livingContestants = 0;
        for(let contestant of this.contestants) if(contestant.alive) livingContestants++;
        if(livingContestants >= 2) {
            this.finished = false;
            this.randomizeContestantOrder();
        }
        else {
            this.finish();
            console.log(`Cannot start a match between only ${livingContestants} living contestant(s).`)
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
     * Returns whether or not the match is finished.
     */
    get finished(): boolean {
        return this._finished;
    }

    /**
     * Sets whether or not the match is finished.
     * @param value The new value.
     * @private No use outside of {@link Match} class.
     */
    private set finished(value: boolean) {
        this._finished = value;
    }

    /**
     * Returns the winner of the match. If there is no current winner, returns null.
     */
    get winner(): Killable | null {
        if(this.finished && this.livingContestants.length > 0) return this.livingContestants[0];
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
     * @private No use for function outside of this class.
     */
    private finish() {
        this.finished = true;
        if(this.winner != null) console.log(`The winner is:\n${this.winner instanceof Fighter ?
            ((this.winner as Fighter).name.preferredName + "\n") : this.winner.toString()}`);
        else console.log("No winner.");
    }

    /**
     * Randomizes the order of the match.
     * @private No use for function outside of this class.
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

}