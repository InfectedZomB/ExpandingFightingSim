import {ComplexName} from "./Entities/Name/ComplexName";
import {Fighter} from "./Entities/Fighter";
import {Match} from "./Utility/Match";
import {Monster} from "./Entities/Monster";
import {Team} from "./Entities/Team/Team";

let skeleton = new Monster("Skeleton", 2);
let zomb = new Fighter(new ComplexName("Zackery", "Fisher", "ZomB"));
let zeltar = new Fighter(new ComplexName("Tim", "Marion", "Zeltar"));
let metal = new Fighter(new ComplexName("Jacob", "Dixon", "Metal"));
let sol = new Fighter(new ComplexName("Sigma", "Balls", "Sol"));

let match = new Match(zomb, zeltar, metal, sol, skeleton);

while(!match.finished) match.nextTurn();

let newTeam: Team = new Team();
console.log(newTeam.id);