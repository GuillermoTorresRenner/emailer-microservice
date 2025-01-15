import logger from "../services/logger.js";
import { PrismaClient } from "@prisma/client";
import moment from "moment-business-days";

const prisma = new PrismaClient();
logger.debug('Validating dates...');

export const getCasosUnresolved = async () => {

    // Calcula la fecha límite (30 días hábiles atrás desde hoy)
    const fechaLimite = moment().businessSubtract(30).toDate();

    try {
        const data = await prisma.casos.findMany({
            where: {
                fecha_asignacion: {
                    lte: fechaLimite
                },
                OR: [
                    {
                        observacion: null
                    },
                    {
                        id_estado_auditoria: {
                            not: 1
                        }
                    }
                ]
            },
            orderBy: {
                id_institucion: 'asc'
            }
        });

        
        return data;
    } catch (error) {
        logger.error(`Error al validar fechas: ${error}`);
    }
};

export const getRecipientsData = async (institutionsId) => {
    try {
        const data = await prisma.users.findMany({
            select: {
                username: true,
                nombre: true,
                id_institucion:true,
                
                
            },
            where: {
                id_institucion: {
                    in: institutionsId
                },
                vigente: true
            },
            orderBy: {
                id_institucion: 'asc'
            }
        });
        return data;
    } catch (error) {
        logger.error(`Error al obtener emails: ${error}`);
    } 

}

 export const getInstitutionsData = async (idInstitutions) => {
        try {
            const data = await prisma.institucions.findMany({
                select: {
                    id_institucion	: true,
                    descripcion: true,
                   
                },
                where: {
                    id_institucion	: {
                        in: idInstitutions
                    }
                },
                orderBy: {
                    id_institucion: 'asc'
                }

            });
            return data;
        } catch (error) {
            logger.error(`Error al obtener datos de instituciones: ${error}`);
        }
    }