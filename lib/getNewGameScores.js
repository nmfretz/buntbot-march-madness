const fs = require("fs");
const axios = require("axios").default;
require("dotenv").config();

const completedGamesJson = require("../completedGameIds.json");
const { sportradarUrl, teams } = require("./constants");

let completedGameIds = completedGamesJson.gameIds;

async function getNewGameScores() {
  const response = await axios.get(sportradarUrl);
  const todaysGames = response.data.games;
  let newGameScoresArray = [];
  let newCompletedGameIds = [];
  todaysGames.forEach((game) => {
    if (game.status !== "closed" && game.status !== "complete") return;
    if (completedGameIds.includes(game.id)) return;
    if (!teams.includes(game.home.alias)) return console.log("game not in main March Madness bracket");
    newGameScoresArray.push(
      `${game.title} Final Score:\n${game.home.alias}: ${game["home_points"]} | ${game.away.alias}: ${game["away_points"]}`
    );
    newCompletedGameIds.push(game.id);
  });

  fs.readFile("completedGameIds.json", function (err, data) {
    const json = JSON.parse(data);
    newCompletedGameIds.forEach((id) => {
      json.gameIds.push(id);
    });

    fs.writeFile("completedGameIds.json", JSON.stringify(json), "utf8", function (error) {
      if (error) {
        console.log("an error occured writing to file");
      }
    });
    completedGameIds = json.gameIds;
  });
  return newGameScoresArray;
}

module.exports = {
  getNewGameScores,
};
