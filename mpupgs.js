
function checkMPU(n) {
if (game.greenpower.gte(decalcGP(game.mpucosts[n][0])) && game.redpower.gte(game.mpucosts[n][1])) return true; 
else return false;
}

function mpupg(n) {
	switch (n) {
	case 1:
	if (game.greenpower.gte(decalcGP(game.mpucosts[0][0])) && game.redpower.gte(game.mpucosts[0][1])) {
	game.greenpower = game.greenpower.minus(decalcGP(game.mpucosts[0][0]));
	game.redpower = game.redpower.minus(game.mpucosts[0][1]);
	game.mproot = ON.max(game.mproot.div(1.1), 4);
	game.mpucosts[0][0] = game.mpucosts[0][0].pow(1.1337);
	game.mpucosts[0][1] = game.mpucosts[0][1].pow(1.15);
	}
	break
	case 2:
	if (game.greenpower.gte(decalcGP(game.mpucosts[1][0])) && game.redpower.gte(game.mpucosts[1][1])) {
	game.greenpower = game.greenpower.minus(decalcGP(game.mpucosts[1][0]));
	game.redpower = game.redpower.minus(game.mpucosts[1][1]);
	game.gpbasegain = game.gpbasegain.mul(1.25).round()
	game.mpucosts[1][0] = game.mpucosts[1][0].pow(1.075);
	game.mpucosts[1][1] = game.mpucosts[1][1].pow(1.0875);
	}
	break
	} 
}