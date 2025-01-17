import { getEmailData } from "../services/databaseService.js";
import { sendEmail, sendTestEmail } from "../services/mailer.js";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";

export const main = async () => {
    const emailInfo = await getEmailData();
    // console.log(JSON.stringify(emailInfo, null, 2));
    // Cargar la plantilla HTML
    const templatePath = path.resolve("emailsTemplate/email.hbs");
    const templateSource = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);

    // Generar el HTML
    const html = template({ data: emailInfo });
    // Enviar el correo

    if (process.env.NODE_ENV === "development") {

        await sendTestEmail(html);
    } else {
        emailInfo.forEach(async institutionInfo => {
            const recipients = institutionInfo.recipients.map(rec => rec.username).join(", ");
            await sendEmail(html, recipients);
        });
    }
};

