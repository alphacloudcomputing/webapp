#! /bin/bash

sudo cp webapp.zip /opt/webapp
# Unzipping application
sudo unzip webapp.zip -d /opt/webapp

# Changing to webapp directory
cd /opt/webapp

# Moving users.csv to opt directory
sudo mv /opt/webapp/users.csv /opt

# Moving the .service file to systemd service
sudo mv /opt/webapp/packer/assignment-start.service /etc/systemd/system

# Installing dependencies of nodejs
sudo npm i

# Changing permissions of binaries
sudo chown -R csye6225:csye6225 /opt/webapp
sudo chmod g+x /opt/webapp

# Starting application services
sudo systemctl daemon-reload
sudo systemctl enable assignment-start
sudo systemctl start assignment-start