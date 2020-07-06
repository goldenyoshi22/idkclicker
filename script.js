
function $(id) {return document.getElementById(id)}; //totally not copy pasted

let D = x => {
  return new OmegaNum(x);
} //totally not copy pasted 2

var ON = OmegaNum;

var game = {
greenpoints: D(0),
greenpower: D(1),
redmoney: D(0),
redpoints: D(0),
prestiged: false
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
	game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpoints.add(2).root(2)).round());
	} else if (n == 2) {		
	game.greenpower = game.greenpower.add(1)
	} else if (n == 3) {		
	if (game.redmoney.gte(1)) {
    game.redmoney = game.redmoney.sub(1)
	game.redpoints = game.redpoints.add(1)
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
	game.redpoints = game.redpoints.add(game.redmoney)
    game.redmoney = ON(0)
	}
	updateThings()
}	
function updateThings() {
	$("number").innerHTML = "you have " + notation(game.greenpoints) + " green points and " + notation(game.greenpower.mul(game.redpoints.add(2).root(2)).round()) + " green power"
	$("number2").innerHTML = "you have " + notation(game.redmoney) + " red money and " + notation(game.redpoints) + " red points (x" + notation(game.redpoints.add(2).root(2)) + " mult)"
	if (game.greenpoints.gte(25)) $("redprestige").style.display = "inline"; 
	else $("redprestige").style.display = "none";
if (game.prestiged == true) {$("green2").style.display = "inline"; $("redprestigearea").style.display = "inline";} 
	else {$("green2").style.display = "none"; $("redprestigearea").style.display = "none"; }
	$("redprestige").innerHTML = "prestige for " + notation(calcPrestige(game.greenpoints)) + " red currency"
}

updateThings()