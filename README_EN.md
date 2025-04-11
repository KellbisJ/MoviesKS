# MoviesKS

MoviesKS is a web-based movie database platform that allows users to access comprehensive movie information. With this application, you can search for movies by title, view details of individual films, and filter movies by genre, among other features.

## Project Installation

Follow these steps to install and run the project locally:

1. **Clone the Repository:**

   - Clone this repository using your preferred method (HTTPS, SSH, or GitHub CLI). Alternatively, you can fork the repository and clone it from your fork.

2. **Set Up the Backend:**

   - Navigate to the `/backend` directory in your terminal.
   - Run the command `npm install` to install all backend dependencies.
   - Once installation is complete, start the backend server using `npm run start`. The backend will run locally at `localhost:8000`.

3. **Set Up the Frontend:**
   - Navigate to the `/frontend` directory in your terminal.
   - Run the command `npm install` to install all frontend dependencies.
   - Start the development server locally with `npm run start`. The terminal will display the port where the frontend is available.

## Available Commands

### Frontend (Vite)

- **`npm run start`**

  - Starts the development server for the frontend, enabling local development.

- **`npm run build`**

  - Builds an optimized production version in the `dist` directory.

- **`npm run serve`**
  - Previews the production version locally before deployment.

### Backend (Express)

- **`npm run start`**
  - Starts and mount the backend on local.

## Environment variables

- Frontend:
  - **`VITE_APP_SERVER=<backend-server-url>`**
- Backend:
  - **`NODE_ENV=<work-env>`**
  - **`PORT=<port-number>`**
  - **`API_KEY=<your-themoviedb-api-key>`**

### Request a free TheMovieDB Api Key

[TheMovieDB](https://www.themoviedb.org 'TheMovieDB')

## Project Structure

The repository includes two main directories:

- **`/backend:`** Handles requests to TheMovieDB API, utilizing the required headers and API key to fetch movie data.
- **`/frontend:`** Makes requests to the backend and presents relevant data in the user interface.
