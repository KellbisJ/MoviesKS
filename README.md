# MoviesKS

MoviesKS es un sitio web de base de datos de películas diseñado para proporcionar a los usuarios información detallada sobre películas. Con esta plataforma, puedes buscar películas por título, explorar detalles específicos de películas individuales y filtrar resultados por género, entre otras funciones.

## Instalación del Proyecto

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. **Clonar el Repositorio:**

   - Clona este repositorio utilizando tu método preferido (HTTPS, SSH o GitHub CLI). También puedes hacer un fork del repositorio y clonar desde tu fork.

2. **Configurar el Backend:**

   - Navega al directorio `/backend` desde tu terminal.
   - Ejecuta el comando `npm install` para instalar todas las dependencias del backend.
   - Una vez completada la instalación, inicia el servidor con `npm run start`. Esto ejecutará el backend localmente en `localhost:8000`.

3. **Configurar el Frontend:**
   - Navega al directorio `/frontend` desde tu terminal.
   - Ejecuta el comando `npm install` para instalar todas las dependencias del frontend.
   - Inicia el servidor de desarrollo local con `npm run start`. La terminal te indicará el puerto en el que está disponible la aplicación frontend.

## Comandos Disponibles

### Frontend (Vite)

- **`npm run start`**

  - Inicia el servidor de desarrollo para trabajar en el frontend localmente.

- **`npm run build`**

  - Genera una versión optimizada para producción en la carpeta `dist`.

- **`npm run serve`**
  - Previsualiza localmente la versión de producción generada antes de desplegarla.

### Backend (Express)

- **`npm run start`**
  - Inicia y despliega el servidor backend en local.

## Estructura del Proyecto

El repositorio contiene dos carpetas principales:

- **`/backend:`** Responsable de gestionar solicitudes a la API de TheMovieDB, utilizando los encabezados y claves necesarios para acceder a los datos.
- **`/frontend:`** Envia solicitudes al backend para obtener y mostrar datos relevantes en la interfaz de usuario.
