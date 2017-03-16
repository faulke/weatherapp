#!/bin/bash
cd /home/ec2-user/weatherapp/
sudo forever start -c "node -r babel-register" tools/distServer.js > /dev/null 2> /dev/null < /dev/null &
