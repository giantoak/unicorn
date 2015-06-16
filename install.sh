#!/bin/sh

# Install nodejs, npm, and elasticdump
sudo apt-get -y update
sudo apt-get -y install nodejs
sudo apt-get -y install npm
sudo npm install elasticdump -g

# create a symlink for nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node

# Install pip, virtualenv, setup python environment
sudo apt-get -y install python-pip
#sudo pip install virtualenv
#virtualenv env
#source env/bin/activate

# Install sci-kit learn dependencies
sudo apt-get -y install build-essential python-dev python-setuptools \
                     python-numpy python-scipy \
                     libatlas-dev libatlas3gf-base

# Install sci-kit learn
sudo pip install scikit-learn


# Install postgresql and psycopg2
sudo apt-get -y install postgresql postgresql-contrib
sudo apt-get -y install python-psycopg2
sudo apt-get -y install libpq-dev


# Install unoconv
sudo apt-get install -y unoconv

# Install packages for SSL
sudo apt-get install -y libssl-dev libffi-dev

# Install Python dependencies
sudo pip install -r requirements.txt

# Install NLTK dependencies
python nltk_deps.py

# Initialize unoconv
unoconv -l &

# Run elasticsearch as a service set up script
sudo bash ElasticSearch.sh 1.5.2

# stop elasticsearch
sudo service elasticsearch stop

# install the elasticsearch mapper attachment plugin
sudo /usr/share/elasticsearch/bin/plugin install elasticsearch/elasticsearch-mapper-attachments/2.5.0

# Reboot elasticsearch as a service
sudo service elasticsearch start

# Sleep for 10 seconds while Elasticsearch boots up
sleep 10

# delete any index call dossiers then recreate it (wipe it)
curl -XDELETE "http://localhost:9200/dossiers/"  ; curl -XPUT "http://localhost:9200/dossiers/" 

# check the index size (should be 0 documents)
curl 'localhost:9200/_cat/indices?v'

# use elasticdump to build our index. First, read in the mapping, then read in the data
sudo elasticdump \
  --input=dossiers_mapping.json \
  --output=http://localhost:9200/dossiers \
  --type=mapping 

# print the mapping and make sure it looks like a large JSON object
curl -XGET 'http://localhost:9200/dossiers/_mapping/attachment?pretty'

# finally, load some dummy data
sudo elasticdump \
  --bulk=true \
  --input=dossiers.json \
  --output=http://localhost:9200/dossiers \
  --type=data

###### uncomment the below if you do not want to initialize with any sample data! ####
# curl -XDELETE "http://localhost:9200/dossiers/" ; curl -XPUT "http://localhost:9200/dossiers/" 

#sudo elasticdump \
#  --bulk=true \
#  --input=dossiers_mapping.json \
#  --output=http://localhost:9200/dossiers \
#  --type=mapping \
#  --debug=true

