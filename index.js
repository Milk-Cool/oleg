import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import fs from "fs";

const getDay = () => Math.floor(Number(new Date()) / (1000 * 3600 * 24));

const { TOKEN, ID, START } = process.env;
const quotes = fs.readFileSync("quotes.txt", "utf-8").split("\n").filter(Boolean);

const bot = new TelegramBot(TOKEN, { "polling": false });

// bot.sendMessage(parseInt(ID), "restart");

cron.schedule("0 7 * * *", async () => {
    const n = getDay() - parseInt(START);
    if(n >= quotes.length) return;
    bot.sendMessage(parseInt(ID), quotes[n]);
});