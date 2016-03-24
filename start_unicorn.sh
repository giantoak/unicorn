#!/bin/bash
sudo unoconv -l &
sleep 3
sudo service postgresql start
sleep 3
# sudo service mysql start
# sleep 3
sudo service elasticsearch start
sleep 3
python run.py
