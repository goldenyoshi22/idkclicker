function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && new OmegaNum(object[i]) instanceof OmegaNum && !(new OmegaNum(object[i]).sign == 0 && object[i] != "0")) {
          object[i] = new OmegaNum(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
                merge(base[i], source[i]);
            } else {
                if (isDecimal(base[i]) && !isDecimal(source[i])) {
                    base[i] = new OmegaNum(source[i]);
                } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                    base[i] = source[i].toNumber();
                } else {
                    base[i] = source[i];
                }
            }
        }
    }
}


function isDecimal(x) {
    if (x instanceof OmegaNum) {
        return true;
    } else {
        return false;
    }
}


var savegame;

function save() {
  localStorage.setItem("idkclickerv1.4save", JSON.stringify(game));
}

function load() {
  if (localStorage.getItem("idkclickerv1.4save")) {
    savegame = JSON.parse(localStorage.getItem("idkclickerv1.4save"));
    objectToDecimal(savegame);
    merge(game, savegame);
  }
}

function wipeSave() {
/*save of default game*/importSave("eyJncmVlbnBvaW50cyI6eyJhcnJheSI6WzBdLCJzaWduIjoxfSwiaGlnaGVzdGdwIjp7ImFycmF5IjpbMF0sInNpZ24iOjF9LCJncmVlbnBvd2VyIjp7ImFycmF5IjpbMV0sInNpZ24iOjF9LCJncGJhc2VnYWluIjp7ImFycmF5IjpbMV0sInNpZ24iOjF9LCJyZWRtb25leSI6eyJhcnJheSI6WzBdLCJzaWduIjoxfSwiaGlnaGVzdHJtIjp7ImFycmF5IjpbMF0sInNpZ24iOjF9LCJyZWRwb3dlciI6eyJhcnJheSI6WzBdLCJzaWduIjoxfSwicmVkcm9vdCI6eyJhcnJheSI6WzJdLCJzaWduIjoxfSwicmVkcm9vdDIiOnsiYXJyYXkiOlsyLjU2XSwic2lnbiI6MX0sInIyY29zdCI6eyJhcnJheSI6WzEwXSwic2lnbiI6MX0sInByZXN0aWdlZCI6ZmFsc2UsInVwZ3JhZGVzIjpbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCJub3RhdGlvbiI6MSwibm90YXRpb25hY3RpdmF0ZSI6eyJhcnJheSI6WzEwMDBdLCJzaWduIjoxfSwidGFiIjoxLCJtYXh0YWIiOjMsIm11bHRpcG93ZXIiOnsiYXJyYXkiOlswXSwic2lnbiI6MX0sIm1wcm9vdCI6eyJhcnJheSI6WzldLCJzaWduIjoxfSwiaGlnaGVzdG1wIjp7ImFycmF5IjpbMF0sInNpZ24iOjF9LCJtcHVubG9ja2VkIjpmYWxzZSwibXB1Y29zdHMiOltbeyJhcnJheSI6WzEwMDAwMDAwMDAwXSwic2lnbiI6MX0seyJhcnJheSI6WzU1NTU1NV0sInNpZ24iOjF9XSxbeyJhcnJheSI6WzUwMDAwMDAwMDAwMF0sInNpZ24iOjF9LHsiYXJyYXkiOlsyMDAwMDAwXSwic2lnbiI6MX1dXX0=")
//https://gist.github.com/mcenirm/4165198
{var w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }}
  save();
  load();
  location.reload(false)
}

function exportSave() {
  return btoa(JSON.stringify(game));
}

function importSave(text) {
  savegame = JSON.parse(atob(text));
  objectToDecimal(savegame);
  merge(game, savegame);
  
  save();
}