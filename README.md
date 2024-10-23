
# Project (v1.0.0)

## Project Description

This project is a web application built using **Next.js** with **TypeScript**. It follows best practices for React development and provides a modern and scalable structure.

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14.x or later)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bix-desafio
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Project

Use the following commands to run the project:

- **Development Mode**: 
  ```bash
  npm run dev
  # or
  yarn dev
  ```
  This will start the application in development mode with hot-reloading enabled.

- **Build the Project**: 
  ```bash
  npm run build
  # or
  yarn build
  ```
  This will create a production build of the project.

- **Start the Production Server**: 
  ```bash
  npm run start
  # or
  yarn start
  ```
  This will start the project in production mode.

## Project Architecture

The project follows a **modular architecture** to ensure scalability and maintainability. The main structure is as follows:

- **app/**: Contains the Next.js pages and API routes.
- **lib/**: Utility functions and modules shared across the application.
- **public/**: Static assets like images, fonts, etc.
- **utils/**: Helper functions and shared utilities.
- **.env**: Environment variables configuration.

## Logic of the Project

The project is a **server-side rendered (SSR)** application using Next.js, which provides fast load times and a great user experience. Here's an overview of the logic:

- **Pages**: The application uses the `app/` directory to define different routes. Each route corresponds to a specific page of the application.
  
- **API Routes**: Inside the `app/api/` directory, there are API endpoints that handle requests from the client side, allowing for interaction with a backend or database.

- **Components**: The UI components are built using React and styled with CSS Modules or other styling methods, ensuring isolation and reusability.

- **State Management**: The project may use Context API or other libraries (such as Zustand or Redux) to handle global state management, ensuring data consistency across different pages and components.

## Environment Variables

The project requires certain environment variables to be set. You can copy the `.env.example` file to `.env` and update the values as necessary:
```bash
cp .env.example .env
```

## Available Scripts

The following scripts are available in the `package.json` file:
- dev, build, start

## Dependencies

Here is a list of the main dependencies used in the project:
```json
{
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@fontsource/roboto": "^5.1.0",
  "@hookform/resolvers": "^3.9.0",
  "@mui/icons-material": "^6.1.5",
  "@mui/lab": "^6.0.0-beta.13",
  "@mui/material": "^6.1.5",
  "@mui/x-date-pickers": "^7.21.0",
  "@reduxjs/toolkit": "^2.2.0",
  "date-fns": "^4.1.0",
  "dayjs": "^1.11.13",
  "firebase": "^11.0.0",
  "next": "latest",
  "next-auth": "^4.24.8",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.53.1",
  "react-redux": "^9.1.0",
  "react-toastify": "^10.0.6",
  "recharts": "^2.13.0",
  "styled-components": "^6.1.13",
  "zod": "^3.23.8"
}
```

## Dev Dependencies

These are the development dependencies:
```json
{
  "@types/node": "20.2.5",
  "@types/react": "18.2.37",
  "@types/react-dom": "^18.2.18",
  "typescript": "^5.3.3"
}
```

## Contributing

If you want to contribute to this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
