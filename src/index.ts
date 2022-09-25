import {Name, PreferredName} from "./Entities/Name";
import {Fighter} from "./Entities/Fighter";
import {Match} from "./Utility/Match";

let zomb = new Fighter(new Name("Zackery", "Fisher", "ZomB", PreferredName.NICK));
let zeltar = new Fighter(new Name("Tim", "Marion", "Zeltar", PreferredName.NICK));
let metal = new Fighter(new Name("Jacob", "Dixon", "Metal", PreferredName.NICK));
let sol = new Fighter(new Name("Sigma", "Balls", "Sol", PreferredName.NICK));

let match = new Match(zomb, zeltar, metal, sol);

while(!match.finished) match.nextTurn();