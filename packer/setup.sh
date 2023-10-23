#! /bin/bash

# Ensuring all dependencies are up-to-date
sudo apt update
sudo apt upgrade 

sudo DEBIAN_FRONTEND=noninteractive

# Installing mariadb server
sudo apt install mariadb-server -y
sudo systemctl start mariadb

# Setting up root user password
sudo mysql -e "ALTER USER '$DATABASE_USER'@'localhost' IDENTIFIED BY '$DATABASE_PASSWORD'; flush privileges;"

# Installing npm and nodejs
sudo apt install npm nodejs unzip -y

# Creating new usergroup 
sudo groupadd csye6225

# Giving privileges
sudo useradd -s /bin/false -g csye6225 -d /home/admin -m csye6225