import { getEmailData } from "../services/databaseService.js";
import { sendEmail } from "../services/mailer.js";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";

export const main = async () => {
    const emailInfo = await getEmailData();

    // Cargar la plantilla HTML
    const templatePath = path.resolve("emailsTemplate/email.hbs");
    const templateSource = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);

    // Generar el HTML
    const html = template({ data: emailInfo });
    // Enviar el correo
    await sendEmail(html);
};

