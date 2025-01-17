import 'dotenv/config';
import logger from "./src/services/logger.js"
import { main } from "./src/controller/main.js"
import cron from 'node-cron';
logger.debug('Starting application...');

const MIN = process.env.MINUTE;
const HOUR = process.env.HOUR;
const DAY_OF_MONTH = process.env.DAY_OF_MONTH;
const MONTH = process.env.MONTH;
const DAY_OF_WEEK = process.env.DAY_OF_WEEK;


// const cronEmailer = cron.schedule(` ${MIN} ${HOUR} ${DAY_OF_MONTH} ${MONTH} ${DAY_OF_WEEK}`, async () => {
const cronEmailer = cron.schedule(' 05 16 * * *', async () => {
    await main();
}, {
    timezone: 'America/Santiago',
});
const test = async () => {
    await main();
}

test();



