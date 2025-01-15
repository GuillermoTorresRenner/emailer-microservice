import nodemailer from 'nodemailer';
import logger from './logger.js';

//TODO:Revisar config en base a los valores de adened
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_SERVER, 
    port: process.env.EMAIL_SMTP_PORT, 
    secure: true, 
    auth: {
        user: process.env.EMAIL_FROM_ADDRESS,
        pass: process.env.EMAIL_FROM_ADDRESS_PASSWORD, // Contraseña del correo
    },
     tls: {
        ciphers: 'TLSv1.2', // Opcional: aseguramos una versión segura de TLS
    },
});



//TODO: cambiar parámetros par que sean dinámicos en base a las consutas de la base de datos
export const sendEmail = async (html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Soporte Técnico" <${process.env.EMAIL_FROM_ADDRESS}>`, // Nombre y correo del remitente
            to: process.env.EMAIL_TO_USER,
            subject: 'Prueba de Envío', // Asunto del correo
            html
        });

        logger.info(`Correo enviado: ${process.env.EMAIL_TO_USER}`);
    } catch (error) {
        logger.error(`Error al enviar correo: ${error}`);
    }
};


