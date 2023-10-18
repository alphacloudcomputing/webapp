#! /bin/bash

# Unzipping application
sudo unzip webapp.zip -d web-app

# Changing to webapp directory
cd web-app

# Moving users.csv to opt directory
sudo mv /home/admin/users.csv /opt

# Installing dependencies of nodejs
sudo npm i