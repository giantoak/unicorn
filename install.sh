#!/bin/sh

# Install pip, virtualenv, setup python environment
apt-get install python-dev
apt-get install python-pip
pip install virtualenv
virtualenv env

# Install unoconv
apt-get install -y unoconv

# Install packages for SSL
apt-get install -y libssl-dev libffi-dev

# Install Python dependencies
source env/bin/activate
pip install -r requirements.txt

# Install NLTK dependencies
python nltk_deps.py

# Initialize unoconv
unoconv -l &
