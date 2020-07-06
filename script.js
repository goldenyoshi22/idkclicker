
function $(id) {return document.getElementById(id)}; //totally not copy pasted

let D = x => {
  return new OmegaNum(x);
} //totally not copy pasted 2

var ON = OmegaNum;

var game = {
greenpoints: D(0),
greenpower: D(1),
redmoney: D(0),
redpower: D(0),
redroot: D(2),
r2cost: D(10),
prestiged: false,
upgrades: [false]
}

function notation(num, dec = 2) {
  if (num.gte(1e6)) {
    let exponent = num.logBase(10).floor()
    let mantissa = notation(num.div(OmegaNum.pow(10, exponent)), dec)
    
    return mantissa + "e" + exponent;
  }
  return OmegaNum.round(num.times(OmegaNum.pow(10, dec))).div(
    OmegaNum.pow(10, dec)) //totally not copy pasted 3
}


function increment(n = 1) {
	if (n == 1) { 
	game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round());
	} else if (n == 2) {		
	game.greenpower = game.greenpower.add(1)
	} else if (n == 3) {		
	if (game.redmoney.gte(1)) {
    game.redmoney = game.redmoney.sub(1)
	game.redpower = game.redpower.add(1)
	}} else if (n == 4) {
	if (game.redmoney.gte(game.r2cost)) {
	game.redroot = game.redroot.div(1.05)
	game.redmoney = game.redmoney.sub(game.r2cost)
	game.r2cost = game.r2cost.pow(1.169).round()
	}}
	updateThings()
    
}

function calcPrestige(num) {
return num.root(2.56).sub(2).floor()	
}

function prestige() {
game.redmoney = game.redmoney.add(calcPrestige(game.greenpoints))
game.greenpoints = D(0)
game.greenpower = D(1)
game.prestiged = true
updateThings()
}

function maxred1() {
	if (game.redmoney.gte(1)) {
	game.redpower = game.redpower.add(game.redmoney)
    game.redmoney = ON(0)
	}
	updateThings()
}	

function upgrade() {
if (game.upgrades[0] == false && game.redmoney.gte(20)) {
setInterval(function(){game.redpower = game.redpower.add(0.25)}, 250); 
setInterval(updateThings, 250)
game.redmoney = game.redmoney.sub(20);
game.upgrades[0] = true
$("upg1btn").innerHTML = "gain 1 red power per second and unlock red 2 (you already bought this you chicken)"
}
updateThings()
}
function updateThings() {
	$("number").innerHTML = "you have " + notation(game.greenpoints) + " green points and " + notation(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round()) + " green power"
	$("number2").innerHTML = "you have " + notation(game.redmoney) + " red money and " + notation(game.redpower) + " red power (x" + notation(game.redpower.add(2).root(game.redroot)) + " mult, root " + notation(game.redroot) + " formula)"
	if (game.greenpoints.gte(25)) $("redprestige").style.display = "inline"; 
	else $("redprestige").style.display = "none";
if (game.prestiged == true) {$("green2").style.display = "inline"; $("redprestigearea").style.display = "inline";} 
	else {$("green2").style.display = "none"; $("redprestigearea").style.display = "none"; }
if (game.upgrades[0] == true) {$("red2").style.display = "inline";} 
	else {$("red2").style.display = "none";}
	$("redprestige").innerHTML = "prestige for " + notation(calcPrestige(game.greenpoints)) + " red currency"
	$("redcosts").innerHTML = "r1: cost 1 R$ | r2: cost " + notation(game.r2cost.round()) + " R$"
}

load() //saving.js
updateThings()
setInterval(save, 4200)