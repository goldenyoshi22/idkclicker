
function $(id) {return document.getElementById(id)};

let D = x => {
  return new OmegaNum(x);
}

var ON = OmegaNum;

var game = {
idkpoints: D(0)
}

function increment() {
	game.idkpoints = game.idkpoints.add(1)
    $("number").innerHTML = "you have " + game.idkpoints + " idk points"	
}