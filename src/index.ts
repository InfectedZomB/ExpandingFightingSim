import {ComplexName} from "./Entities/Name/ComplexName";
import {Fighter} from "./Entities/Fighter";
import {Match} from "./Utility/Match";
import {Monster} from "./Entities/Monster";
import {Team} from "./Entities/Team/Team";

let zomb = new Fighter(new ComplexName("Zackery", "Fisher", "ZomB"));
let zeltar = new Fighter(new ComplexName("Tim", "Marion", "Zeltar"));
let metal = new Fighter(new ComplexName("Jacob", "Dixon", "Metal"), Team.randomTeam);
let cooltrex = new Fighter(new ComplexName("Xavier", "Munoz", "Cooltrex"), Team.randomTeam);
let sol = new Fighter(new ComplexName("Sigma", "Balls", "Sol"), Team.randomTeam);
let skeleton = new Monster("Skeleton", 2);

let match = new Match(zomb, zeltar, metal, cooltrex, sol, skeleton);

while(!match.finished) match.nextTurn();

console.log(Team.globalTeamList.length);
for(let team of Team.globalTeamList) console.log(team.id);