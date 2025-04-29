# RewardZ App 
* Created By: Thaer Shunnar
----
# Deploy and Run Rewardz app locally

1. Build and Start the Containers
Run the following command to build and start all the containers
``docker-compose up --build``
This command will:
* Build the backend and frontend images.
* Start the backend, frontend, MySQL database, and phpMyAdmin containers.

2. Access the Application
Once the containers are running, you can access the application at the following URLs:

*   Frontend: http://localhost:3000
    * To login, you need to create an account using an email and a name only. No requirement for a password.
*   Backend API: http://localhost:5678
*   phpMyAdmin: http://localhost:8080
    *   Use the following credentials to log in to the DB:
        * Username: root
        * Password: password123

3. Verify Database Seeding
The database is automatically seeded with initial data during container startup. If the database is not seeded, you can manually seed it:
```
docker-compose exec backend bash
rails db:seed
```
----
----

# Rewardz Backend Setup Guide

This document provides instructions for setting up and running the Rewardz backend application. Follow the steps below to configure your development environment, run the application, and test its functionality.

---

## Prerequisites

1. **Install Docker Desktop**  
   Ensure you have Docker Desktop installed on your machine. It is required to run the MySQL and phpMyAdmin containers.

2. **Install Devbox**  
   Devbox is used to manage the development environment for this project. Instructions for starting Devbox are provided below.

---

## 1. Setting Up Devbox

Devbox is a development environment manager that simplifies dependency management. It ensures all required tools and libraries are available for the project.

### Starting Devbox
1. Navigate to the project root directory.
2. Run the following command to start the Devbox shell:
   ```
   devbox shell
   ```

Devbox should automatically install Rails for you. However, if Rails is not installed, you can manually install it using:
    ```
    sudo gem install rails
    ```
 

## 2. Setting Up MySQL and phpMyAdmin Containers

The setup-mysql-containers.sh script automates the setup of MySQL containers for development and testing, as well as a phpMyAdmin container for database management.

### Running the Script
- Ensure you are in the scripts directory.

    ``cd scripts``
- Run the script to set up the containers.

    ``./setup-mysql-containers.sh``

The script will:
- Start a MySQL container for development (rewardz_db_dev) and a test database (rewardz_db_test).
- Start a phpMyAdmin container accessible at http://localhost:8080.

## 3. Running Database Migrations and Seeding

After setting up the MySQL containers, you need to run migrations to create the database schema and seed the database with initial data.

### Running Migrations
- Start the Devbox shell.
    ``devbox shell``
- Run the Rails migration command.
    ``rails db:migrate``

### Seeding the Database
- Seed the database with initial data.
    ``rails db:seed``

## 4. Running the Rails Application

To start the Rails backend server:

- Ensure you are in the project root directory for the backend.
- Start the Rails server.
    ``rails server``

The application will be accessible at http://localhost:5678.

## 5. Testing API Endpoints with Bruno

Bruno is a tool for testing API endpoints. The project includes predefined API endpoints in the **bruno** folder.

### Using Bruno
- Open Bruno and import the bruno/rewards folder.
- Use the predefined endpoints to test the API functionality.

## 6. Running RSpec Tests

RSpec is used for testing the backend application.

### Running Tests
- Start the Devbox shell if you're not in a shell already.
    ``devbox shell``
- make sure you are in the **backend** directory
- Run the RSpec tests.
    ``rspec``

## Additional Notes

- **Docker Desktop**: Ensure Docker Desktop is running before executing any scripts or commands that rely on Docker.
- **Devbox Shell**: Always use the Devbox shell for running commands to ensure the correct environment is loaded.
- **Rails Installation**: If Rails is not installed by Devbox, install it manually using:
    ``sudo gem install rails``


----
----
----

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
