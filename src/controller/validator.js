import logger from "../services/logger.js";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../services/mailer.js";
const prisma = new PrismaClient();

export const validateDatesJob = async () => {
   logger.debug('Validating dates...');
   //TODO:Implementar lógica de validaciones en base a consultas de la base de datos
    // const data= await prisma.casos.findMany()
    // console.log(data)

    //pruebas de correo
    sendEmail();    


}