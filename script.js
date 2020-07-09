
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
upgrades: [false, false, false, false],
notation: 1,
notationactivate: D(1e3),
tab: 1
}
var e100 = Infinity //funy
const notationnames = ["scientific", "logarithm", "real scientific", "cancer"]

//having a default game doesnt work so...
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
notation: 1,
notationactivate: D(1e3),
tab: 1
}
location.reload(false)
}
var app = new Vue({
  el: '#game',
  data: {
	game: game,
	calcPrestige: calcPrestige,
	notation: notation,
	notationnames: notationnames
  }
})

function toFixed(num, dec = 2) {
	return OmegaNum.round(num.times(OmegaNum.pow(10, dec))).div(OmegaNum.pow(10, dec))
}
//thank you yahtzee master
function notation(num, r = 2, notationOverride = notation) {
  const e = num.logBase(10).floor()
  const m = num.div(OmegaNum.pow(10, e)).times(OmegaNum.pow(10, r)).floor().div(OmegaNum.pow(10, r))

  if (num.eq(0)) return "0"
  else switch (notationOverride ) {
    case 1: //scientific
      if (num.lt(game.notationactivate)) return num.times(OmegaNum.pow(10, r)).floor().div(OmegaNum.pow(10, r))
     
      return `${m}e${e}`
      break
    case 2: //logarithm
      if (num.lt(game.notationactivate)) return notation(num, r, 1)

      return `e${toFixed(num.logBase(10))}`
      break
    case 3: //real scientific
      if (num.lt(game.notationactivate)) return notation(num, r, 1)
      
      return `${m} x 10<sup>${e}</sup>`
      break
	case 4: //cancer
	return num.toJSON()
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
	}}
	if (game.redroot.lt(1.25)) game.redroot = D(1.25)
	break}
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
    switch (num) {
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
	case 4:
	if (game.upgrades[3] == false && game.redmoney.gte(1000)) {
    game.redmoney = game.redmoney.sub(1000)
setInterval(function(){game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round().div(100))}, 100);
game.upgrades[3] = true
	}
	}
}

load() //saving.js
if (game.upgrades[0] == true) setInterval(function(){game.redpower = game.redpower.add(0.25)}, 250);
if (game.upgrades[3] == true) setInterval(function(){game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round().div(100))}, 100);
setInterval(save, 4200)

function switchNotation() {
	if (game.notation == 4) game.notation = 1 
	else game.notation += 1
}

function switchNotationActivate() {
var yes = prompt('when would you like the notation to take effect? (0-1e100)')
if (ON(yes).lt(0)) game.notationactivate = D(0)
else if (ON(yes).gt(1e100)) game.notationactivate = D(1e100)
else game.notationactivate = D(yes)
}