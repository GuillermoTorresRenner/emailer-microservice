import logger from "../services/logger.js";
import { PrismaClient } from "@prisma/client";
import moment from "moment-business-days";

const prisma = new PrismaClient();

export const getCasosUnresolved = async () => {
    // Calcula la fecha límite (30 días hábiles atrás desde hoy)
    const fechaLimite = moment().businessSubtract(30).toDate();

    try {
        const data = await prisma.casos.findMany({
            select: {
                id_caso: true,
                fecha_asignacion: true,
                id_institucion: true,
            },
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
            distinct: ['id_caso'],
            orderBy: {
                id_caso: 'asc'
            }
        });

        // Agregar el campo calculado
        const today = moment();
        const dataWithDaysDifference = data.map(caso => {
            const fechaAsignacion = moment(caso.fecha_asignacion);
            const diasDiferencia = today.diff(fechaAsignacion, 'days');
            return {
                ...caso,
                dias_diferencia: diasDiferencia
            };
        });

        return dataWithDaysDifference;
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
                id_institucion: true,


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
                id_institucion: true,
                descripcion: true,

            },
            where: {
                id_institucion: {
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