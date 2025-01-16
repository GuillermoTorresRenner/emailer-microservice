import logger from "../services/logger.js";
import { getCasosUnresolved, getRecipientsData, getInstitutionsData } from "../repository/databaseRepository.js";

export const getEmailData = async () => {
    try {
        const casosUnresolved = await getCasosUnresolved();
        // Obtener todos los id_institucion sin repeticiones
        const ids = casosUnresolved.map(caso => caso.id_institucion);
        const uniqueInstitutionsIds = [...new Set(ids)];
        const recipientsData = await getRecipientsData(uniqueInstitutionsIds);
        const institutions = await getInstitutionsData(uniqueInstitutionsIds);

        const data = []
        uniqueInstitutionsIds.forEach((id) => {
            const group = {
                institution: institutions.find((i) => i.id_institucion === id),
                recipients: recipientsData
                    .filter((recipient) => recipient.id_institucion === id)
                    .map(({ id_institucion, ...rest }) => rest),
                casos: casosUnresolved.filter((caso) => caso.id_institucion === id)
            };

            data.push(group);
        });

        return data;
    } catch (error) {
        logger.error(`Error al obtener datos: ${error}`);
        return null
    }

};