
function $(id) {return document.getElementById(id)}; //totally not copy pasted
function c(classname) {return document.getElementsByClassName(classname)};

let D = x => {
  return new OmegaNum(x);
} //totally not copy pasted 2

var ON = OmegaNum;

console.log('pls no hac me :(')

let ones = ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"]
let altones = ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"]
let tens = ["", "Dc", "Vg", "Tg", "Qg", "Qi", "Sg", "St", "Og", "Ng"]
let hundreds = ["", "Ce", "Du", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]

for (let i = 1; Math.floor(i / 10) < hundreds.length - 1, i++;) {
if (Math.floor((i-2) / 10) >= hundreds.length - 1) break;

tens.push(tens[(i-2) % 10] + hundreds[Math.floor((i+8) / 10)])
}

for (let i = 1; Math.floor(i / 10) < tens.length - 1, i++;) {
if (Math.floor((i-2) / 10) >= tens.length - 1) break;

ones.push(altones[(i-2) % 10] + tens[Math.floor((i+8) / 10)])
}


//mousetrap stuff
Mousetrap.bind('4', () => {if (game.prestiged == true && game.upgrades[0] == true) increment(4)});
Mousetrap.bind('r', () => {if (game.greenpoints.gte(25)) prestige()});
Mousetrap.bind('right', () => {if (game.tab == game.maxtab) {game.tab = 1} else {game.tab += 1}})
Mousetrap.bind('left', () => {if (game.tab == 1) {game.tab = game.maxtab} else {game.tab -= 1}})
Mousetrap.bind('up', () => {if (game.tab == game.maxtab) {game.tab = 1} else {game.tab += 1}})
Mousetrap.bind('down', () => {if (game.tab == 1) {game.tab = game.maxtab} else {game.tab -= 1}})

var game = {
greenpoints: D(0),
highestgp: D(0),
greenpower: D(1),
gpbasegain: D(1),
redmoney: D(0),
highestrm: D(0),
redpower: D(0),
redroot: D(2),
redroot2: D(2.56),
r2cost: D(10),
prestiged: false,
upgrades: [false, false, false, false, false, false, false, false, false],
notation: 1,
notationactivate: D(1e3),
notationactivate2: D("ee3"),
tab: 1,
maxtab: 3,
multipower: D(0),
mproot: D(9),
highestmp: D(0),
mpunlocked: false,
mpucosts: [[D(1e10), D(555555)], [D(5e11), D(2e6)]],
usemixednotation: false
}

var e100 = Infinity //funy
const robuxtrolls = ["hehe i tricked you >:)", "i would rickroll you but that would most likely make me gay", "jk y'o'rre'is' dum'b", "do you are have stupid", "you just summoned thanos now he will snap you", "r", "stupid", "im running out of things to put here", "CONGRATS!!!!!!!!!!! YOU WON INFINITY ROBUX"]
const notationnames = ["scientific", "logarithm", "real scientific", "cancer (ne, nde)", "tetration (ne, nde)", "infinity (ne)", "standard (nde, notation activate is min of 1,000)"]

var app = new Vue({
  el: '#game',
  data: {
	game: game,
	calcPrestige: calcPrestige,
	notation: notation,
	notationnames: notationnames,
	toFixed: toFixed,
	checkMPU: checkMPU,
  }
})

//window.onload = function() {if (game.usemixedstandard == true) document.getElementById("usemixednotation").checked = true};
//setInterval(() => {if (game.tab == 2) {game.usemixedstandard = document.getElementById("usemixednotation").checked}}, 100)

function toFixed(num, dec = 2) {
	return OmegaNum.round(num.times(OmegaNum.pow(10, dec))).div(OmegaNum.pow(10, dec))
}
//thank you yahtzee master
function notation(num, r = 2, notationOverride = game.notation) {
  const e = num.logBase(10).floor()
  const e2 = num.logBase(10).logBase(10).floor()
  const m = num.div(OmegaNum.pow(10, e)).times(OmegaNum.pow(10, r)).floor().div(OmegaNum.pow(10, r))
  const m2 = num.logBase(10).div(OmegaNum.pow(10, e2)).times(OmegaNum.pow(10, r)).floor().div(OmegaNum.pow(10, r))

  if (num.eq(0)) return "0"
  else switch (notationOverride) {
    case 1: //scientific
      if (num.lt(game.notationactivate)) return num.times(OmegaNum.pow(10, r)).floor().div(OmegaNum.pow(10, r))
      if (num.lt(game.notationactivate2)) return `${m}e${e}`
      return `e${m2}e${e2}`
      break
    case 2: //logarithm
      if (num.lt(game.notationactivate)) return notation(num, r, 1)
	  if (num.lt(game.notationactivate2)) return `e${toFixed(num.logBase(10))}`
      return `ee${toFixed(num.logBase(10).logBase(10))}`
      break
    case 3: //real scientific
      if (num.lt(game.notationactivate)) return notation(num, r, 1)
      if (num.lt(game.notationactivate2)) return `${m} x 10<sup>${e}</sup>`
      return `10<sup>${m2} x 10<sup>${e2}</sup></sup>`
      break
	case 4: //cancer
	return num.toJSON()
	break
	case 5: //tetration
	return `2^^${toFixed(num.slog(2), 3)}`
	break
	case 6: //infinity
	if (num.lt(game.notationactivate2)) return `${toFixed(num.logBase(ON.pow(2, 1024)), 3)}∞`
	return `${toFixed(num.logBase(ON.pow(2, 1024)).logBase(ON.pow(2, 1024)), 4)}∞<sup>2</sup>`
	break
	case 7: //standard
    if (num.lt(ON.min(game.notationactivate, 1000))) return toFixed(num, r)
    else return toFixed(num.div(ON.pow(1000, ON.logBase(num, 1000).floor())), r) + ones[ON.logBase(num, 1000).floor().toNumber()]
	break
    default:
      return "thats not a notation, dummy"
  }
}

function increment(n = 1) {
	switch (n) {
	case 1:
	if (game.mpunlocked == true) game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).mul(game.multipower).round());
	else game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round())
	break
	case 2:		
	game.greenpower = game.greenpower.add(game.gpbasegain.floor())
	break
	case 3:
	if (game.redmoney.gte(1)) {
    game.redmoney = game.redmoney.sub(1)
	if (game.mpunlocked == true) game.redpower = game.redpower.add(game.multipower)
	else game.redpower = game.redpower.add(1)
	} break
	case 4:
	if (game.redmoney.gte(game.r2cost)) {
	if (game.redroot.gt(1.25)) {
	game.redroot = game.redroot.div(1.05)
	game.redmoney = game.redmoney.sub(game.r2cost)
	game.r2cost = game.r2cost.pow(1.142).round()
	}}
	if (game.redroot.lt(1.25)) game.redroot = D(1.25)
	break
	case 5:
	game.gpbasegain = game.gpbasegain.add(game.upgrades[8] ? 0.5 : 0.1)
	break}
}

function calcPrestige(num) {
if (game.upgrades[5] == true) return num.root(game.redroot2).sub(2).mul(calcGP().add(42).logBase(42)).floor()
else return num.root(game.redroot2).sub(2).floor()	
}

function calcGP(num = game.greenpower) {
if (game.mpunlocked == false) return num.mul(game.redpower.add(2).root(game.redroot)).round()
else return num.mul(game.redpower.add(2).root(game.redroot)).mul(game.multipower).round()	
}

function decalcGP(num = calcGP()) {
if (game.mpunlocked == false) return num.div(game.redpower.add(2).root(game.redroot)).round()
else return num.div(game.redpower.add(2).root(game.redroot)).div(game.multipower).round()	
}

function prestige() {
game.redmoney = game.redmoney.add(calcPrestige(game.greenpoints))
game.greenpoints = D(0)
game.greenpower = D(1)
game.prestiged = true
}

function maxred1(m = 1) {
	if (m == 1) {
		if (game.redmoney.gte(1)) {
	if (game.mpunlocked == true) game.redpower = game.redpower.add(game.redmoney.mul(game.multipower))
	else game.redpower = game.redpower.add(game.redmoney)
    game.redmoney = ON(0)
	}
	} else {
		if (game.redmoney.gte(1)) {
	if (game.mpunlocked == true) game.redpower = game.redpower.add(game.redmoney.div(2).mul(game.multipower).ceil())
	else game.redpower = game.redpower.add(game.redmoney.div(2).ceil())
    game.redmoney = game.redmoney.sub(game.redmoney.div(2).ceil())
	}
	}
}	

function upgrade(num) {
    switch (num) {
    case 1:
	if (game.upgrades[0] == false && game.redmoney.gte(20)) {
setInterval(() => {game.redpower = game.redpower.add(0.25)}, 250);
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
	if (game.upgrades[3] == false && game.redmoney.gte(777)) {
    game.redmoney = game.redmoney.sub(777)
setInterval(() => {game.greenpoints = game.greenpoints.add(game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round().div(100))}, 100);
game.upgrades[3] = true
	}
	break	
	case 5:
	if (game.upgrades[4] == false && game.redmoney.gte(3333)) {
    game.redmoney = game.redmoney.sub(3333)
setInterval(() => {game.redpower = game.redpower.add(game.redpower.div(ON(1000).mul(game.redpower.logBase(5))))}, 100);
game.upgrades[4] = true
	}
	break
	case 6:
	if (game.upgrades[5] == false && game.redmoney.gte(5000)) {
	game.redmoney = game.redmoney.sub(5000)
	game.upgrades[5] = true
	}
	break
	case 7:
	if (game.upgrades[6] == false && game.redmoney.gte(22222)) {
	game.redmoney = game.redmoney.sub(17777)
	game.upgrades[6] = true
	setInterval(() => {game.redmoney = game.redmoney.add(calcPrestige(game.greenpoints.add(25)).div(200))}, 100)
	}
	break
	case 8:
	if (game.upgrades[7] == false && game.redmoney.gte(1.5e5)) {
	game.redmoney = game.redmoney.sub(1.5e5)
	game.upgrades[7] = true
	}
	break
	case 9:
	if (game.upgrades[8] == false && game.redmoney.gte(1e6)) {
	game.redmoney = game.redmoney.sub(1e6)
	game.upgrades[8] = true
	game.gpbasegain = game.gpbasegain.round()
	}
	break
	}
}

function unlockmp() {
if (game.redmoney.gte(42069) && game.mpunlocked == false) {game.mpunlocked = true; game.maxtab = 4; game.redmoney = game.redmoney.sub(42069); setInterval(mpcalc, 100)}
}

function mpcalc() {
game.multipower = game.greenpower.mul(game.redpower.add(2).root(game.redroot)).round().add(game.redpower).root(game.mproot)
}

load() //saving.js
//checks for upgrades 2, 4, 5, and 7 (the array is kinda confusing, [2] is upg 1, [0] is upg 2, [1] is upg 3, the rest are normal)
if (game.upgrades[0] == true) setInterval(() => {game.redpower = game.redpower.add(0.25)}, 250);
if (game.upgrades[3] == true) setInterval(() => {game.greenpoints = game.greenpoints.add(calcGP().div(10))}, 100);
if (game.upgrades[4] == true) setInterval(() => {game.redpower = game.redpower.add(game.redpower.div(ON(1000).mul(game.redpower.logBase(5))))}, 100);
if (game.upgrades[6] == true) setInterval(() => {game.redmoney = game.redmoney.add(calcPrestige(game.greenpoints.add(25)).div(200))}, 100)
//check multipower
if (game.mpunlocked == true) setInterval(mpcalc, 100)
setInterval(save, 4200)

function switchNotation() {
	if (game.notation == 7) game.notation = 1 
	else game.notation += 1
}

function switchNotationActivate(n) {
switch (n) {
case 1: {
var yes = prompt('when would you like the notation to take effect? (0 to 1.7976e308)')
if (isNaN(yes)) {console.log('bruh')}
else {
if (yes.Array == undefined) yes = ON(yes)
if (yes.lt(0)) game.notationactivate = D(0)
else if (ON(yes).gt(ON.pow(2, 1024))) game.notationactivate = ON.pow(2, 1024)
else game.notationactivate = D(yes)
}
break;
}
case 2: {
var yes = prompt('when would you like the doubly notation to take effect? (0 to 10^(2^1,024))')
if (isNaN(yes)) {console.log('bruh')}
else {
if (yes.Array == undefined) yes = ON(yes)
if (yes.lt(0)) game.notationactivate2 = D(0)
else if (ON(yes).gt(ON.pow(10, ON.pow(2, 1024)))) game.notationactivate2 = ON.pow(10, ON.pow(2, 1024))
else game.notationactivate2 = D(yes)
}
break;
}
}
}

//stats
setInterval(() => {if (game.greenpoints.gt(game.highestgp)) game.highestgp = game.greenpoints}, 100);
setInterval(() => {if (game.redmoney.gt(game.highestrm)) game.highestrm = game.redmoney}, 100);
setInterval(() => {if (game.multipower.gt(game.highestmp)) game.highestmp = game.multipower}, 100);


function checkMPU(n) {
if (game.greenpower.gte(decalcGP(game.mpucosts[n][0])) && game.redpower.gte(game.mpucosts[n][1])) return true; 
else return false;
}