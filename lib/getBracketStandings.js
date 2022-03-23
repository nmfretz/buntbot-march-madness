const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteer = require("puppeteer-extra");
puppeteer.use(StealthPlugin());
require("dotenv").config();

const { firstBracketMember, lastBracketMember } = require("./constants");

async function startBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return { browser, page };
}

async function getMemberRank(page, memberIndex) {
  const [place] = await page.$x(
    `//*[@id="main-0-Group-Proxy"]/div/div[2]/div[2]/div/table/tbody/tr[${memberIndex}]/td[1]/span`
  );
  const placeText = await page.evaluate((el) => {
    return el.textContent;
  }, place);

  const [person] = await page.$x(
    `//*[@id="main-0-Group-Proxy"]/div/div[2]/div[2]/div/table/tbody/tr[${memberIndex}]/td[2]/a/div/div/div[1]`
  );
  const personText = await page.evaluate((el) => {
    return el.textContent;
  }, person);

  const [points] = await page.$x(
    `//*[@id="main-0-Group-Proxy"]/div/div[2]/div[2]/div/table/tbody/tr[${memberIndex}]/td[9]`
  );
  const pointsText = await page.evaluate((el) => {
    return el.textContent;
  }, points);

  return { placeText, personText, pointsText };
}

async function getBracketStandings(url) {
  try {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 900, height: 700 });
    await page.goto(url);

    // click Yahoo Fantasy sign-in button
    await page.waitForXPath('//*[@id="header-0-TourneyHeader-Proxy"]/div/div/div[1]/div/div[2]/div/a[1]');
    const [signInBtn] = await page.$x('//*[@id="header-0-TourneyHeader-Proxy"]/div/div/div[1]/div/div[2]/div/a[1]');
    if (signInBtn) {
      await signInBtn.click();
    }

    // click google sign-in
    await page.waitForXPath('//*[@id="tpa-google-button"]');
    const [googleBtn] = await page.$x('//*[@id="tpa-google-button"]');
    if (googleBtn) {
      await googleBtn.click();
    }

    // enter email address
    await page.waitForSelector("#identifierId");
    await page.type("#identifierId", process.env.YAHOO_FANTASY_EMAIL, { delay: 100 }); // delay used for debugging
    await page.keyboard.press("Enter");

    // enter password
    await page.waitForSelector('input[name="password"]');
    await page.waitFor(1000);
    await page.type("#identifierId", process.env.YAHOO_FANTASY_PASSWORD, { delay: 100 }); // delay used for debugging
    await page.keyboard.press("Enter");

    // handle email confirmation popup, if any
    if (
      (await page.waitForXPath('//*[@id="overlay-0-FantasyUnifiedEmail-Proxy"]/div/div/div/div/div/div[1]/div[2]')) !==
      null
    ) {
      const [exitBtn] = await page.$x(
        '//*[@id="overlay-0-FantasyUnifiedEmail-Proxy"]/div/div/div/div/div/div[1]/div[2]'
      );
      await exitBtn.click();
    }

    // click on desired bracket
    await page.click('a[href="/t1/group/74586"]');

    // wait for body of main table to load
    await page.waitForXPath(
      '//*[@id="main-0-Group-Proxy"]/div/div[2]/div[2]/div/table/tbody/tr[1]/td[2]/a/div/div/div[1]'
    );
    await page.waitFor(2000); // TODO - consider removing after testing

    // get innerText of each member's ranking
    let leaderBoardArray = [];
    for (let i = firstBracketMember; i < lastBracketMember; i++) {
      const person = await getMemberRank(page, i);
      leaderBoardArray.push(person);
    }
    console.log(leaderBoardArray);

    await browser.close();
    return leaderBoardArray;
  } catch (error) {
    // TODO - handle errors properly
    if (browser !== undefined) {
      await browser.close();
    }
    return [];
  }
}

module.exports = {
  getBracketStandings,
};
