# 📧 Micro Servicio de Notificación por Correo Electrónico para ministerio de Salud (ADENED)🇨🇱 

Este proyecto es un servicio de notificación por correo electrónico que envía reportes diarios sobre casos no resueltos a las instituciones correspondientes. Utiliza Node.js, Prisma y Handlebars para generar y enviar correos electrónicos con información detallada.

## 🚀 Características

- **Generación de reportes**: Obtiene datos de casos no resueltos de ña base de datos del programa central y evalúa los niveles de avance en la resolución de los casos por parte del ministerio generando reportes en formato HTML.
- **Envío de correos electrónicos**: Envía los reportes generados a los destinatarios correspondientes.
- **Programación de tareas**: Utiliza cron para programar el envío de correos electrónicos diariamente.

## 🛳️ Puertos

- Por defecto el programa corre en el puerto 3000, aunque eso se puede cambiar en el archivo.env dentro de la viariable PORT.
  ```.env
    PORT=3000
    ```


## 🛠️ Tecnologías Utilizadas

- Node.js
- Prisma
- Handlebars
- Nodemailer
- Moment.js

## 📋 Requisitos

- Node.js (v14 o superior)
- Prisma CLI
- Una cuenta de correo electrónico para enviar los correos

## 📦 Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
    ```env
    DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tu_base_de_datos"
    EMAIL_SMTP_SERVER="smtp.tu-servidor.com"
    EMAIL_SMTP_PORT=465
    EMAIL_FROM_ADDRESS="tu-correo@dominio.com"
    EMAIL_FROM_ADDRESS_PASSWORD="tu-contraseña"
    EMAIL_TO_USER="destinatario@dominio.com"
    ```

## 📅 Programación de Tareas

El servicio utiliza `node-cron` para programar el envío de correos electrónicos diariamente a las 18:22 (hora de Santiago, Chile). Puedes ajustar la programación en el archivo `app.js`:

```js
const cronEmailer = cron.schedule('22 18 * * *', async () => {
    await main();
}, {
    timezone: 'America/Santiago',
});

## 🐋 Uso de la Imagen desde Docker Hub

Puedes utilizar la imagen del proyecto alojada en Docker Hub para ejecutar el servicio sin necesidad de construir la imagen localmente.

1. Descarga la imagen desde Docker Hub:
    ```bash
    docker pull lebateleur/cron-email-service:tagname
    ```

2. Ejecuta el contenedor Docker utilizando la imagen descargada:
    ```bash
    docker run -d --name cron-email-notification-service -p 3000:3000 --env-file .env lebateleur/cron-email-service:tagname
    ```

3. Verifica los logs del contenedor:
    ```bash
    docker logs -f cron-email-notification-service
    ```

## 🐳 Ejecución con Docker

Para construir y ejecutar el contenedor Docker:

1. Construye la imagen Docker:
    ```bash
    docker build -t cron-email-notification-service .
    ```

2. Ejecuta el contenedor Docker:
    ```bash
    docker run -d --name cron-email-notification-service -p 3000:3000 --env-file .env cron-email-notification-service
    ```

3. Verifica los logs del contenedor:
    ```bash
    docker logs -f cron-email-notification-service
    ```
