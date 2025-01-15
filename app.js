import 'dotenv/config';
import logger from "./src/services/logger.js"
import { main } from "./src/controller/main.js"
import cron from 'node-cron';
logger.debug('Starting application...');


//const cronEmailer=cron.schedule('0 8 * * 1', async () => {
// const cronEmailer = cron.schedule(' 22 18 * * *', async () => {
//     await main();
// }, {
//     timezone: 'America/Santiago',
// });
const test = async () => {
    await main();
}

test();



