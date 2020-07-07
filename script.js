
function $(id) {return document.getElementById(id)}; //totally not copy pasted
function c(classname) {return document.getElementsByClassName(classname)};

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
redroot2: D(2.56),
r2cost: D(10),
prestiged: false,
upgrades: [false, false, false],
notation: 1
}
var tab = "idk buttons"
const notationnames = ["scientific", "logarithm"]

var defaultgame = { ...game }

function getNewSave() {
	game = {
greenpoints: D(0),
greenpower: D(1),
redmoney: D(0),
redpower: D(0),
redroot: D(2),
redroot2: D(2.56),
r2cost: D(10),
prestiged: false,
upgrades: [false, false, false],
notation: 1
}
location.reload(false)
}
var app = new Vue({
  el: '#game',
  data: {
	game: game,
	calcPrestige: calcPrestige,
	tab: tab,
	notation: notation,
	notationnames: notationnames
  }
})

function toFixed(num, dec = 2) {
	return OmegaNum.round(num.times(OmegaNum.pow(10, dec))).div(OmegaNum.pow(10, dec))
}
//thank you yahtzee master
function notation(num, r = 2, notationOverride = notation) {
  switch (notationOverride ) {
    case 1:
      if (num.lt(1e3)) return num.times(OmegaNum.pow(10, r)).floor().div(OmegaNum.pow(10, r))

      const e = num.logBase(10).floor()
      const m = notation(num.div(OmegaNum.pow(10, e)), r, 1)
      
      return `${m}e${e}`
      break
    case 2:
      if (num.lt(1000)) return notation(num, r, 1)

      return `e${toFixed(num.logBase(10))}`
      break
    default:
      return "thats not a notation, dummy"
  }
}


function increment(n = 1) {
	switch (n) {
	case 1:
	game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round());
	break
	case 2:		
	game.greenpower = game.greenpower.add(1)
	break
	case 3:
	if (game.redmoney.gte(1)) {
    game.redmoney = game.redmoney.sub(1)
	game.redpower = game.redpower.add(1)
	} break
	case 4:
	if (game.redmoney.gte(game.r2cost)) {
	if (game.redroot.gt(1.25)) {
	game.redroot = game.redroot.div(1.05)
	game.redmoney = game.redmoney.sub(game.r2cost)
	game.r2cost = game.r2cost.pow(1.169).round()
	break
	}}}
}

function calcPrestige(num) {
return num.root(game.redroot2).sub(2).floor()	
}

function prestige() {
game.redmoney = game.redmoney.add(calcPrestige(game.greenpoints))
game.greenpoints = D(0)
game.greenpower = D(1)
game.prestiged = true
}

function maxred1() {
	if (game.redmoney.gte(1)) {
	game.redpower = game.redpower.add(game.redmoney)
    game.redmoney = ON(0)
	}
}	

function upgrade(num = 1) {
    switch (n) {
    case 1:
	if (game.upgrades[0] == false && game.redmoney.gte(20)) {
setInterval(function(){game.redpower = game.redpower.add(0.25)}, 250);
game.redmoney = game.redmoney.sub(20);
	game.upgrades[0] = true}
	break
	case 2:
	if (game.upgrades[1] == false && game.redmoney.gte(100)) {
	game.redroot2 = D(2)
	game.redmoney = game.redmoney.sub(100)
	game.upgrades[1] = true
	}
    break
    case 3:
	if (game.upgrades[2] == false && game.redmoney.gte(3)) {
	game.redmoney = game.redmoney.sub(3)
	game.upgrades[2] = true
	}
	break
	}
}

load() //saving.js
if (game.upgrades[0] == true) {
setInterval(function(){game.redpower = game.redpower.add(0.25)}, 250);
}
setInterval(save, 4200)

function switchNotation() {
	if (game.notation == 2) game.notation = 1 
	else game.notation += 1
}
