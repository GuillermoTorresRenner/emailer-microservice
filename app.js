import 'dotenv/config'; 
import logger from "./src/services/logger.js"
import {validateDatesJob} from "./src/controller/validator.js"
import cron from 'node-cron';
logger.debug('Starting application...');



//const cronEmailer=cron.schedule('0 8 * * 1', async () => {
const cronEmailer = cron.schedule('* * * * *', async () => {
    await validateDatesJob();
}, {
    timezone: 'America/Santiago',
});



