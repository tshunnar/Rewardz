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

The application will be accessible at http://localhost:3000.

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

