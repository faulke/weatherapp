#!/bin/bash
cd /home/ec2-user/weatherapp/
sudo npm install
sudo npm run build
sudo npm run prod > /dev/null 2> /dev/null < /dev/null &
