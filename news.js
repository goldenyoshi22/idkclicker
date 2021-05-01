//thank you yahtzee master^^^^66666
"use strict"
let ticker, tickerContainer


  ticker = document.getElementById("newsContent")
  tickerContainer = document.getElementById("newsTicker")
  
let newsPosition = -1e100 // hopefully noones screen is this big

function tickNews() {
  newsPosition -= 3.33;
  ticker.style.left = `${newsPosition}px`
  
  if (newsPosition < -ticker.offsetWidth) newNewsMessage()
}

function newNewsMessage() {
  const newsCandidates = []
  for (const i in newsArray) if (newsArray[i][1] === undefined || newsArray[i][1]()) newsCandidates.push(newsArray[i][0])

  ticker.innerHTML = newsCandidates[Math.floor(newsCandidates.length * Math.random())]
  newsPosition = tickerContainer.offsetWidth
  ticker.style.left = `${newsPosition}px`
}

const newsArray = [
  ["Hello World"], //1
  ["IT'S OVER 9000", () => calcGP().gt(9000) || game.redpower.gt(9000)], //2
  ["in a world where <span class='btxt'>blue</span> never existed, until 100 years later. when blue came out, the world exploded of waiting.", () => game.multipower.gte(100)], //3
  ["hacker!!", () => calcGP().gte("1e100")], //4
  ["version &alpha;1.5 coming in &omega;<sup>1.5</sup> year- wait, do ordinal decimal exponents even exist...?"], //5
  ["huge credit to yahtzee master for the news ticker code"], //6
  [`you have ${game.multipower.sqrt()} multimultipower, multiplying everything by 1`, () => game.multipower.gte(25)], //7
  ["idk but thanks for the free R$ I needed it for some gamepasses -Katakana"], //8
  ["no incremental is complete without a news ticker"], //9
  ["IT'S WAY OVER 9000", () => calcGP().gte(9e9) || game.redpower.gte(9e9)], //10
  ["<button onclick='alert(`are you serious?`)' class='wbtn'>click this for nothing to happen</button>"], //11
  ["guys i unlocked rainbow shadow survival at eeee1000000 green points omg omg omg OMGGG guys guys i beat the game for 10&uarr;<sup>1,000</sup>10 HOW!!!!!!!!!!!!!!!!!"], //12
  ["red barely has any upgrades, please add more"], //13
  ["IT'S SO OVER 9000 THAT YOU ARE GONNA DIE", () => calcGP().gte("1e9000") || game.redpower.gte("1e9000")], //14
  ["use eval input in your thing and see what happens (spoiler alert: people using arbitrary code)"]
]
  
setInterval(tickNews, 25)
