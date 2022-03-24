require("dotenv").config();

const yahooFantasyUrl = "https://tournament.fantasysports.yahoo.com/t1";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const SPORTRADAR_API_KEY = process.env.SPORTRADAR_API_KEY;
const sportradarUrl = `http://api.sportradar.us/ncaamb/trial/v7/en/games/${year}/${month}/${day}/schedule.json?api_key=${SPORTRADAR_API_KEY}`;

const MINUTES_TO_MILLISECONDS = 1 * 60 * 1000;
const botIntervalMinutes = 10; // how often the script should main bot function should run
const botIntervalMs = botIntervalMinutes * MINUTES_TO_MILLISECONDS;
const whatsappTextIntervalMs = 1100; // 1 message per second rate limit

const firstBracketMember = 1;
const lastBracketMember = 17;

// const subscribers = [process.env.NATE]; // for testing
const subscribers = [
  process.env.NATE,
  process.env.BRIAN,
  process.env.KEELIN,
  process.env.JORDO,
  process.env.MAX,
  process.env.CAITLIN,
  process.env.HELEN,
  process.env.SAM,
  process.env.JACOB,
  process.env.ANDY,
  process.env.LYSA,
  process.env.JAS,
  process.env.DUNCAN,
];

const botNumber = process.env.TWILIO_SANDBOX_NUMBER;

const reminderMessage =
  "🤖 beep boop. Please respond with a message if you would like to keep receiving buntbot updates for the next 24 hours.";

// array of teams to implement logic to avoid non-March-Madness main bracket games
const teams = [
  "CSU",
  "MICH",
  "PROV",
  "SDST",
  "BSU",
  "MEM",
  "BAY",
  "NORF",
  "TENN",
  "LONG",
  "IOWA",
  "RICH",
  "GONZ",
  "GAST",
  "UNC",
  "MARQ",
  "CONN",
  "NMSU",
  "UK",
  "SPC",
  "SDSU",
  "CREI",
  "SMC",
  "IND",
  "ARK",
  "UVM",
  "UCLA",
  "AKR",
  "MURR",
  "SF",
  "KU",
  "TXSO",
  "OSU",
  "L-IL",
  "AUB",
  "JVST",
  "TTU",
  "MTST",
  "PUR",
  "YALE",
  "VILL",
  "DEL",
  "USC",
  "MIA",
  "ALA",
  "ND",
  "TEX",
  "VT",
  "ILL",
  "CHAT",
  "DUKE",
  "CSF",
  "ARIZ",
  "WRST",
  "LSU",
  "ISU",
  "MSU",
  "DAV",
  "HOU",
  "UAB",
  "HALL",
  "TCU",
  "WIS",
  "COLG",
];

const insults = [``]; // your array of insults here

module.exports = {
  yahooFantasyUrl,
  sportradarUrl,
  botIntervalMs,
  whatsappTextIntervalMs,
  firstBracketMember,
  lastBracketMember,
  subscribers,
  botNumber,
  reminderMessage,
  teams,
  insults,
};
