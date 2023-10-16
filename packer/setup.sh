#! /bin/bash

# Ensuring all dependencies are up-to-date
sudo apt update
sudo apt upgrade 

sudo DEBIAN_FRONTEND=noninteractive

# Installing mariadb server
sudo apt install mariadb-server -y
sudo systemctl start mariadb

# Setting up root user password
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'manav1201'; flush privileges;"

# Installing npm and nodejs
sudo apt install npm nodejs -y
