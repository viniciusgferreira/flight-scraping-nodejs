import puppeteer from 'puppeteer'

(async () => {
    const url = 'https://www.google.com/travel/explore?tfs=CBwQAxobag0IAhIJL20vMDIycGZtEgoyMDIzLTA1LTE3GhsSCjIwMjMtMDUtMjFyDQgCEgkvbS8wMjJwZm1wAoIBCwj___________8BQAFIAZgBAQ&tfu=GioaKAoSCUNN7ZS9GFRAEQN86i6LQVBAEhIJueu4WQykVMARAj51lwVNZEA&hl=pt-BR&tcfs=ChcKCS9tLzAyMnBmbRoKU8OjbyBQYXVsb1IEYAJ4AQ'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('.W6bZuc')
    await page.waitForSelector('.MJg7fb')

    const country = await page.$$eval(
        ".W6bZuc",
        els => els.map(el => el.textContent)
    );

    const cost = await page.$$eval(
        ".MJg7fb",
        els => els.map(el => el.textContent)
    )

    const hashList = new Map();
    for (let i = 0; i < cost.length; i++) {
        hashList.set(country[i], cost[i])
    }

    console.log(hashList)

    browser.close()
})();
