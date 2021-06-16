const puppeteer = require('puppeteer');
const request = require('request');

let openPage = function () {
    return new Promise((res, rej) => {
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(`https://finance.tvsi.com.vn/Enterprises/OverView?symbol=VIC`);
            let dat = await page.evaluate(async () => {
                const [button] = await page.$x("//li[contains(., 'fa fa-caret-left')]")
                if (button) {
                    await button.click();
                }
            })
        })
    })
}

module.exports.openPage = openPage