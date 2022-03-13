const { table } = require('console');
const playwright = require('playwright');

var temp = process.argv.slice(2);
var FundsNav = temp[0];
var url = "https://codequiz.azurewebsites.net/";
var position = "";

// set NAV position
switch (FundsNav) {
    case "B-INCOMESSF":
        position = "body > table > tbody > tr:nth-child(2) > td:nth-child(2)";
        break;
    case "BM70SSF":
        position = "body > table > tbody > tr:nth-child(3) > td:nth-child(2)";
        break;
    case "BEQSSF":
        position = "body > table > tbody > tr:nth-child(4) > td:nth-child(2)";
        break;
    case "B-FUTURESSF":
        position = "body > table > tbody > tr:nth-child(5) > td:nth-child(2)";
        break;
}

const browserType = "chromium"; // chrome
async function main() {
    const browser = await playwright[browserType].launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForLoadState("load");

    await page.click('text="Accept"');
    
    await page.waitForSelector('body > table > tbody');
    let element = await page.$(position);
    let value = await page.evaluate(el => el.textContent, element);
    console.log(value);
}
main();