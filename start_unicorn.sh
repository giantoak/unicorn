#!/bin/bash
sudo service postgres start
sudo service mysql start
sudo service elasticsearch start
python run.py
