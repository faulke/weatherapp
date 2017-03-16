#!/bin/bash
cd /home/ec2-user/weatherapp/
sudo babel-node tools/distServer.js > /dev/null 2> /dev/null < /dev/null &
