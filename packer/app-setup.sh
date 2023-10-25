#! /bin/bash

# Unzipping application
sudo unzip webapp.zip -d /opt/webapp

# Changing to webapp directory
cd web-app

# Moving users.csv to opt directory
sudo mv /home/admin/web-app/users.csv /opt

# Moving the .service file to systemd service
sudo mv /home/admin/web-app/packer/assignment-start.service /etc/systemd/system

# Installing dependencies of nodejs
sudo npm i

# Starting application services
sudo systemctl daemon-reload
sudo systemctl enable assignment-start
sudo systemctl start assignment-start