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



export const sendTestEmail = async (html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Servicio de notificaciones" <${process.env.EMAIL_FROM_ADDRESS}>`, // Nombre y correo del remitente
            to: process.env.EMAIL_TO_USER,
            subject: 'Prueba de Envío', // Asunto del correo
            html
        });

        logger.info(`Correo enviado a: ${process.env.EMAIL_TO_USER}`);
    } catch (error) {
        logger.error(`Error al enviar correo: ${error}`);
    }
};
export const sendEmail = async (html, recipients) => {
    try {
        const info = await transporter.sendMail({
            from: `"Servicio de notificaciones ADENED" <${process.env.EMAIL_FROM_ADDRESS}>`, // Nombre y correo del remitente
            to: recipients,
            subject: 'Reporte de auditorías atrasadas ', // Asunto del correo
            html
        });

        logger.info(`Correo enviado a: ${recipients}`);
    } catch (error) {
        logger.error(`Error al enviar correo: ${error}`);
    }
};


