
function $(id) {return document.getElementById(id)};

let D = x => {
  return new OmegaNum(x);
}

var ON = OmegaNum;

var game = {
greenpoints: D(0),
greenclickpower: D(1),
redmoney: D(0),
redpoints: D(0),

}

function increment(n = 1) {
	if (n == 1) { 
	game.greenpoints = game.greenpoints.add(game.greenclickpower); 
	} else if (n == 2) {		
	game.greenclickpower = game.greenclickpower.add(1)
	}
	updateThings()
}

function calcPrestige(num) {
return num.root(1.69).logBase(4).floor()	
}

function updateThings() {
	$("number").innerHTML = "you have " + game.greenpoints + " idk points and " + game.greenclickpower + " click power"
	if (game.greenpoints.gte(69)) $("redprestige").style.display = "inline"
	else $("redprestige").style.display = "none"
	$("redprestige").innerHTML = "prestige for " + calcPrestige(game.greenpoints) + " red currency"
}

updateThings()