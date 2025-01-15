FROM node:18

# Instala nodemon globalmente
RUN npm i -g nodemon

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto 3000
EXPOSE 3000



# Comando para iniciar la aplicación
CMD ["nodemon", "./app.js"]