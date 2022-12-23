import {Name} from "./Entities/Name";
import {Fighter} from "./Entities/Fighter";
import {Match} from "./Utility/Match";

let zomb = new Fighter(new Name("Zackery", "Fisher", "ZomB"));
let zeltar = new Fighter(new Name("Tim", "Marion", "Zeltar"));
let metal = new Fighter(new Name("Jacob", "Dixon", "Metal"));
let sol = new Fighter(new Name("Sigma", "Balls", "Sol"));

let match = new Match(zomb, zeltar, metal, sol);

while(!match.finished) match.nextTurn();