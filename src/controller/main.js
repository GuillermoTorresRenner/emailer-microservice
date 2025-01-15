import logger from "../services/logger.js";

import { getEmailData } from "../services/databaseService.js";


export const main =  async() => {
const emailInfo= await getEmailData()
console.log(emailInfo)

};