import {ComplexName} from "./Entities/Name/ComplexName";
import {Fighter} from "./Entities/Killable/Fighter";
import {Match} from "./Utility/Match";
import {Monster} from "./Entities/Killable/Monster";
import {Team} from "./Entities/Team/Team";
import {Color} from "./Utility/Color";
import {Style} from "./Utility/Style";

let zomb = new Fighter(new ComplexName("Zackery", "Fisher", "ZomB"));
let zeltar = new Fighter(new ComplexName("Tim", "Marion", "Zeltar"));
let metal = new Fighter(new ComplexName("Jacob", "Dixon", "Metal"), zomb.team);
let cooltrex = new Fighter(new ComplexName("Xavier", "Munoz", "Cooltrex"), zeltar.team);
let sol = new Fighter(new ComplexName("Sigma", "Balls", "Sol"), Team.randomTeam);
let tom = new Fighter(new ComplexName("Tom", "Spander"));
let katie = new Fighter(new ComplexName("Katie", "Shay"), tom.team);
let zac = new Fighter(new ComplexName("Zac", "Harris"));
let chris = new Fighter(new ComplexName("Chris", "Durrel"), zac.team)

let skeleton = new Monster("Skeleton", 2);

zomb.team.style = new Style(null, new Color(150, 175, 255));
zeltar.team.style = new Style(null, new Color(200, 0, 255));
tom.team.style = new Style(null, new Color(50, 255, 150));
zac.team.style = new Style(null, new Color(255, 100, 100));

let match = new Match(zomb, zeltar, metal, cooltrex, sol, tom, katie, zac, chris, skeleton);

while(!match.finished) match.nextTurn();

//for(let i = 0; i < 100; i++) new Team();
console.log(Style.styledString(`Number of teams: ${Team.globalTeamList.length}`, new Style("b")));
for(let team of Team.globalTeamList) console.log(team.id);