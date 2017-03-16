#!/bin/bash
cd /home/ec2-user/weatherapp/
sudo npm install
sudo npm install forever -g
sudo aws s3 cp s3://envtester/.env /home/ec2-user/weatherapp
sudo npm run build
