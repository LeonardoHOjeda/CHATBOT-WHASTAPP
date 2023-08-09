# CHATBOT-WHATSAPP (Node y TypeScript)

El proyecto consiste en crear una API (endpoint o microservicio) que se conecte a un bucket de AWS S3.

Los usuarios podrán enviar información a través de esta API y recibirán como respuesta una URL que les permitirá acceder al archivo correspondiente en el bucket.

La API se encargará de autenticar y autorizar a los usuarios, validar los datos recibidos y utilizar los servicios de AWS para interactuar de forma segura con el bucket de S3.

Una vez que se cargue el archivo en el bucket, la API generará una URL de acceso única y segura para que los usuarios puedan descargar el archivo.

# Instalación del proyecto

## Descargar Repositorio
### HTTPS
`https://github.com/LeonardoHOjeda/CHATBOT-WHASTAPP.git`

## Instalar dependencias de desarrollo

Una vez descargado el repositorio, ejecutar el siguiente comando
`npm install`

## Comando para correr el proyecto en **MODO DESARROLLO**

`npm run dev`

# Tecnologías y Librerías Instaladas

- [app-root-path](https://www.npmjs.com/package/app-root-path)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv"](https://www.npmjs.com/package/dotenv)
- [dotenv-parse-variables](https://www.npmjs.com/package/dotenv-parse-variables)
- [express"](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [helmet](https://www.npmjs.com/package/helmet)
- [module-alias](https://www.npmjs.com/package/module-alias)
- [morgan"](https://www.npmjs.com/package/morgan)
- [rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible)
- [ts-standard](https://www.npmjs.com/package/ts-standard)
- [winston](https://www.npmjs.com/package/winston)

## ESLint usado

- [ts-standard](https://www.npmjs.com/package/ts-standard)

## ORM
- [prisma](https://www.npmjs.com/package/ts-standard)

## Prettier (Prisma)
- [ts-prettier-plugin-prisma](https://www.npmjs.com/package/prettier-plugin-prisma)

## Docker Build
Crear la imagen de docker
`docker build -t registry.gobdigital.com/nomina/aws-s3-api:VERSION_NAME .`

Subir la imagen de docker
`docker push registry.gobdigital.com/nomina/aws-s3-api:VERSION_NAME`