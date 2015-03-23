#!/bin/sh

# Install NLTK dependencies
python nltk_deps.py

# Install unoconv
apt-get install -y unoconv

# Initialize unoconv
unoconv -l
