require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const { getBracketStandings } = require("./lib/getBracketStandings");
const { getNewGameScores } = require("./lib/getNewGameScores");
const {
  yahooFantasyUrl,
  botIntervalMs,
  whatsappTextIntervalMs,
  subscribers,
  botNumber,
  insults,
} = require("./lib/constants");
const delay = require("./lib/delay");

async function sendMessages(newGameScoresArray, bracketStandings, standingsMessage) {
  for (let i = 0; i < subscribers.length; i++) {
    // new game score message
    console.log(`messaging ${subscribers[i]}`);
    for (let j = 0; j < newGameScoresArray.length; j++) {
      console.log(`newGameScoresArray ${j}`);
      client.messages
        .create({
          from: `whatsapp:${botNumber}`,
          body: newGameScoresArray[j],
          to: `whatsapp:${subscribers[i]}`,
        })
        .then((message) => console.log(message.sid))
        .catch((error) => console.log(error));
      await delay(whatsappTextIntervalMs);
    }
    // Yahoo Fantasy bracket standings message
    // if statement to guard against web scrape failure
    if (bracketStandings.length > 0) {
      console.log(`buntStandings ${i}`);
      client.messages
        .create({
          from: `whatsapp:${botNumber}`,
          body: standingsMessage,
          to: `whatsapp:${subscribers[i]}`,
        })
        .then((message) => console.log(message.sid))
        .catch((error) => console.log(error));
      await delay(whatsappTextIntervalMs);
    }
  }
}

async function runBot() {
  console.log("fetching new game scores");
  let newGameScoresArray = await getNewGameScores();
  if (newGameScoresArray.length === 0) return console.log(`no new scores at ${new Date()}`);

  console.log("fetching Yahoo Fantasy bracket standings");
  const bracketStandings = await getBracketStandings(yahooFantasyUrl);
  let standingsMessage = "Ballin Bunt Club Standings:\n";
  if (bracketStandings.length > 0) {
    bracketStandings.forEach((standing) => {
      standingsMessage += `${standing.placeText} | ${standing.personText} | ${standing.pointsText}pts\n`;
    });
  }

  console.log("assigning random insult");
  const randomNum = Math.floor(Math.random() * (insults.length - 0) + 0);
  standingsMessage += `\n${insults[randomNum]}`;

  console.log("messaging subscribers");
  await sendMessages(newGameScoresArray, bracketStandings, standingsMessage);
  console.log(`finished sending messages at ${new Date()}`);
}

console.log(`bot started at ${new Date()}`);
setInterval(async () => {
  await runBot();
}, botIntervalMs);
