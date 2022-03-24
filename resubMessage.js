// Send message to subsribers reminding them to interact with the bot to continue receiving messages.
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const { subscribers, botNumber, reminderMessage, whatsappTextIntervalMs } = require("./lib/constants");
const delay = require("./lib/delay");

async function sendMessages() {
  for (let i = 0; i < subscribers.length; i++) {
    client.messages
      .create({
        from: `whatsapp:${botNumber}`,
        body: "Your {{bot}} code is {{123}}",
        to: `whatsapp:${subscribers[i]}`,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
    await delay(whatsappTextIntervalMs);
  }
}

sendMessages();
