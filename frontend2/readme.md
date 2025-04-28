# Rewardz Frontend Application

This document provides instructions for setting up and running the Rewardz frontend application.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that enhances code quality and maintainability.
- **Vite**: A build tool that provides a fast and efficient development experience.
- **MUI (Material UI)**: A React UI framework that implements Google's Material Design.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **npm (Node Package Manager)**: npm comes with Node.js.

## Installation

1.  Navigate to the `frontend2` directory:

    ```bash
    cd frontend2
    ```
2.  Install the dependencies:

    ```bash
    npm install
    ```

## Running the Application

To start the frontend application:

1.  Navigate to the `frontend2` directory:

    ```bash
    cd frontend2
    ```
2.  Run the development server:

    ```bash
    npm run dev
    ```

    This command starts the Vite development server, and the application will be accessible at `http://localhost:5173` (or another port if 5173 is already in use).

## Project Structure

The [frontend2](http://_vscodecontentref_/2) directory contains the following key files and directories:

-   `src/`: Contains the source code for the application.
    -   `components/`: Reusable React components.
    -   `pages/`: React components for different routes/pages of the application.
    -   `api/`: Functions for making API requests to the backend.
    -   `types/`: TypeScript type definitions.
    -   `context/`: React Context providers for managing application state.
-   `public/`: Static assets such as images and fonts.
-   `index.html`: The main HTML file for the application.
-   `vite.config.ts`: Vite configuration file.
-   `package.json`: Contains project metadata, dependencies, and scripts.

## API Interactions

The application interacts with the backend API to fetch rewards, redeem rewards, and update user information. The API functions are located in the `src/api/` directory.

## Additional Information

-   **Vite Configuration**: The `vite.config.ts` file contains the configuration for the Vite build tool. You can customize this file to configure the development server, build process, and other aspects of the application.
-   **TypeScript**: The application is written in TypeScript, which provides static typing and enhances code quality. Ensure you have a good understanding of TypeScript syntax and concepts.
-   **MUI Components**: The application uses MUI (Material UI) components for the user interface. Refer to the MUI documentation for more information on available components and their usage.
