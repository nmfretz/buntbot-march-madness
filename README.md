# Twilio WhatsApp Bot - NCAA March Madness

:robot: This bot updates subscribers after each men's NCAA March Madness game. Each update includes (1) the game's final score and (2) the standings of the group's Yahoo Fantasy bracket.

<img src="https://user-images.githubusercontent.com/85373263/159203726-59172397-ba0c-4f95-95cc-a70ccf762c7b.PNG" width="40%"/>

### Features & Design

- Node.js.
- [Twilio](https://www.twilio.com/docs/whatsapp/api) WhatsApp API to send messages to subscribers.
- [Sportradar](https://developer.sportradar.com/docs/read/Home) API for NCAA data.
- [Puppeteer](https://github.com/puppeteer/puppeteer) Node library to scrape [Yahoo Fantasy](https://tournament.fantasysports.yahoo.com/) bracket.

### TODOS

- [ ] properly handle Puppeteer timeouts
- [ ] implement windows scheduler instead of setInterval()

# Setup

Sign up for Twilio, add Whatsapp number, set-up sandbox.

Run `npm install` in root directory

Change `.env.sample` to `.env` and replace the following with your variables:

- TWILIO_ACCOUNT_SID=your-twilio-sid-here
- TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
- TWILIO_SANDBOX_NUMBER=your-twilio-sandbox-number-here
- SPORTRADAR_API_KEY=your-sportradar-api-key-here
- GOOGLE_EMAIL=your-yahoo-fantasy-sign-in-info-here
- GOOGLE_PASSWORD=your-yahoo-fantasy-sign-in-info-here
- PHONE_NUMBER_1=subscriber-number-here
- PHONE_NUMBER_2=etc...

Update CSS-selectors and XPaths in `getBracketStandings.js` to webscrape your specific Yahoo Fantasy Bracket.

# Deployment

Run `node marchMadnessBot.js` from root directory.
