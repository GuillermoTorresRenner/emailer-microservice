import logger from "../services/logger.js";
import { getCasosUnresolved, getRecipientsData, getInstitutionsData } from "../repository/databaseRepository.js";

export const getEmailData = async () => {
    try {
         logger.debug('Obteniendo datos...');
    const casosUnresolved = await getCasosUnresolved();

    // Obtener todos los id_institucion sin repeticiones
    const ids = casosUnresolved.map(caso => caso.id_institucion);
    const uniqueInstitutionsIds = [...new Set(ids)];
     
        // Obtener los correos de los usuarios de las instituciones
        const recipientsData = await getRecipientsData(uniqueInstitutionsIds);

        const institutions= await getInstitutionsData(uniqueInstitutionsIds);

        const group={
            
            institution:{},
            recipients:[],
            casos:[]
        }
        const data=[]
        uniqueInstitutionsIds.forEach((id) => {

           group.institution = institutions.find((institution) => institution.id_institucion === id);
           group.recipients=recipientsData.filter((recipient) => recipient.id_institucion === id)
           group.casos=casosUnresolved.filter((caso) => caso.id_institucion === id)

          data.push(group)
 
        });  

        return data;
    } catch (error) {
        logger.error(`Error al obtener datos: ${error}`);
        return null
    }
   
};