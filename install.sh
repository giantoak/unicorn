#!/bin/bash

# Basic update
sudo apt-get -y autoremove
sudo apt-get -y update

# get git
sudo apt-get -y install git

# Install scikit learn and python dependencies
sudo apt-get -y install python-pip build-essential python-dev python-setuptools python-numpy python-scipy libatlas-dev libatlas3gf-base

# Update math libraries
sudo update-alternatives --set libblas.so.3  /usr/lib/atlas-base/atlas/libblas.so.3
sudo update-alternatives --set liblapack.so.3 /usr/lib/atlas-base/atlas/liblapack.so.3

# Install postgresql for security DB
sudo apt-get -y install postgresql postgresql-contrib python-psycopg2 libpq-dev

# Install mysql for geodict.
sudo apt-get -y install mysql-server mysql-client libmysqlclient-dev

# Install packages for SSL
sudo apt-get -y install libssl-dev libffi-dev

# Install necessary python modules
sudo pip install -r requirements.txt

# Install NLTK dependencies
python nltk_deps.py

# Install unoconv
sudo apt-get -y install unoconv

# Clone the geodict library into the local dir.
# It isn't a module
git clone https://github.com/giantoak/geodict geodict

# Start MySQL if it's off and populate with geodict data
sudo service mysql start
cd geodict
python populate_database.py
cd ..

# Initialize unoconv
unoconv -l &

# Run elasticsearch as a service set up script
sudo bash ElasticSearch.sh 1.5.2

# stop elasticsearch
sudo service elasticsearch stop

# install the elasticsearch mapper attachment plugin
sudo /usr/share/elasticsearch/bin/plugin --install elasticsearch/elasticsearch-mapper-attachments/2.5.0

# install the elasticsearch carrot2 plugin
# sudo /usr/share/elasticsearch/bin/plugin --install org.carrot2/elasticsearch-carrot2/1.9.0
# According to github.com/carrot2/elasticsearch-carrot2, for ES 1.5.2 we should be using v. 1.8.0 of the carrot 2 plugin
sudo /usr/share/elasticsearch/bin/plugin --install org.carrot2/elasticsearch-carrot2/1.8.0

# Reboot elasticsearch as a service
sudo service elasticsearch start

# Sleep for 10 seconds while Elasticsearch boots up
sleep 10

# delete any index call dossiers then recreate it (wipe it)
curl -XDELETE "http://localhost:9200/dossiers/"
curl -XPUT "http://localhost:9200/dossiers/"

# check the index size (should be 0 documents)
curl "localhost:9200/_cat/indices?v"

# use curl to build our index. First, read in the mapping, then read in the data
curl -XPUT "http://localhost:9200/dossiers/_mapping/attachment" -d @dossiers_mapping.json

# print the mapping and make sure it looks like a large JSON object
curl -XGET 'http://localhost:9200/dossiers/_mapping/attachment?pretty'

# finally, load some dummy data
curl -XPUT "http://localhost:9200/dossiers/_bulk" --data-binary @dossiers.json

bash db_setup.sh
# python createdb.py

###### uncomment the below if you do not want to initialize with any sample data! ####
# curl -XDELETE "http://localhost:9200/dossiers/" ;
# curl -XPUT "http://localhost:9200/dossiers/"

python run.py
