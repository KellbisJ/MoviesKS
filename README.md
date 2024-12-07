# MoviesKS

Este proyecto es un sitio web de base de datos de películas que permite a los usuarios consumir información sobre películas. Los usuarios pueden buscar películas por título, ver detalles sobre películas individuales, y filtrar películas por género, y más.

## Estructura del Proyecto

/moviesKS
  └── /frontend
      └── src/
      └── index.jsx
      ... otros archivos y directorios del frontend
  └── /backend
      └── /api
          └── routes
          └── ... otros archivos y directorios de la API
      └── index.js
      ... otros archivos y directorios del backend
  └── README.md
  └── .gitignore

## Comandos Disponibles

Frontend (Vite):

### `npm run start`

Este comando inicia el servidor de desarrollo del frontend usando Vite. Esto es útil para trabajar en el proyecto localmente.

### `npm run build`

Este comando construye el proyecto para producción usando Vite. Esto creará una versión lista para producción de tu aplicación en el directorio dist.

### `npm run serve`

Este comando inicia un servidor local para previsualizar la versión de producción de tu aplicación. Esto es útil para probar la versión de producción localmente antes de implementarla en un entorno de producción.

Backend (Express):

### `npm run start`

Este comando inicia el servidor backend usando Node.js en modo de observación. Esto significa que el servidor se reiniciará automáticamente cada vez que se detecten cambios en los archivos fuente.

