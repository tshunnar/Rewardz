#!/bin/bash

# Set default values
MYSQL_CONTAINER_NAME="local-mysql-db-dev"
MYSQL_ROOT_PASSWORD="password"
MYSQL_DATABASE="rewardz-db"
MYSQL_PORT=3306

# Check if the container already exists
if [ "$(docker ps -a -q -f name=$MYSQL_CONTAINER_NAME)" ]; then
    echo "Container '$MYSQL_CONTAINER_NAME' already exists. Starting the container..."
    docker start $MYSQL_CONTAINER_NAME
else
    echo "Creating and starting a new MySQL container named '$MYSQL_CONTAINER_NAME'..."
    docker run --name $MYSQL_CONTAINER_NAME \
        -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
        -e MYSQL_DATABASE=$MYSQL_DATABASE \
        -p $MYSQL_PORT:3306 \
        -d mysql:8.0
fi

# Exit immediately if a command exits with a non-zero status
set -e

# Define variables
PMA_CONTAINER_NAME="phpmyadmin-local-dev"
PMA_PORT=8080

# Check if the MySQL container is running
if [ "$(docker ps -q -f name=${MYSQL_CONTAINER_NAME})" ]; then
    echo "MySQL container '${MYSQL_CONTAINER_NAME}' is running."
else
    echo "Error: MySQL container '${MYSQL_CONTAINER_NAME}' is not running."
    echo "Please start the MySQL container before running this script."
    exit 1
fi

# Remove existing phpMyAdmin container if it exists
if [ "$(docker ps -a -q -f name=${PMA_CONTAINER_NAME})" ]; then
    echo "Removing existing phpMyAdmin container..."
    docker rm -f ${PMA_CONTAINER_NAME}
fi

# Run phpMyAdmin container
echo "Starting phpMyAdmin container..."
docker run -d \
    --name ${PMA_CONTAINER_NAME} \
    --link ${MYSQL_CONTAINER_NAME}:db \
    -e PMA_HOST=db \
    -e PMA_PORT=3306 \
    -p ${PMA_PORT}:80 \
    phpmyadmin/phpmyadmin

echo "phpMyAdmin is now running at http://localhost:${PMA_PORT}"
