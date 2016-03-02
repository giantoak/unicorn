#!/bin/bash

# We assume that git, wget, python, and pip are installed

# Install postgresql for security DB
sudo apt-get install -y postgresql postgresql-contrib python-psycopg2 libpq-dev

# Start postgres and set up DB
sudo service postgresql start
sudo -u postgres psql -c "CREATE USER unicorn WITH SUPERUSER CREATEROLE CREATEDB PASSWORD 'unicorn';"
sudo -u postgres psql -c "CREATE DATABASE unicorn;"

# Install mysql for geodict.
# We use a weak default password of "geodict_root" for root
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password geodict_root'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password geodict_root'
sudo apt-get -y install mysql-server mysql-client libmysqlclient-dev

# Install packages for SSL
sudo apt-get install -y libssl-dev libffi-dev

# Install necessary python modules
pip install -r requirements.txt

# Install NLTK dependencies
python nltk_deps.py

# Install unoconv
sudo apt-get install -y unoconv

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
# sudo bash ElasticSearch.sh 1.5.2
sudo bash ElasticSearch.sh 1.7.5

# stop elasticsearch
sudo service elasticsearch stop

# install the elasticsearch mapper attachment plugin
# sudo /usr/share/elasticsearch/bin/plugin --install elasticsearch/elasticsearch-mapper-attachments/2.5.0
sudo /usr/share/elasticsearch/bin/plugin --install elasticsearch/elasticsearch-mapper-attachments/2.7.1

# install the elasticsearch carrot2 plugin
# sudo /usr/share/elasticsearch/bin/plugin --install org.carrot2/elasticsearch-carrot2/1.9.0
# According to github.com/carrot2/elasticsearch-carrot2, for ES 1.5.2 we should be using v. 1.8.0 of the carrot 2 plugin
# sudo /usr/share/elasticsearch/bin/plugin --install org.carrot2/elasticsearch-carrot2/1.8.0
sudo /usr/share/elasticsearch/bin/plugin --install org.carrot2/elasticsearch-carrot2/1.9.1

# Reboot elasticsearch as a service
sudo service elasticsearch start

# Sleep for 10 seconds while Elasticsearch boots up
sleep 10

# If the user hasn't made a runconfig.py file, create a default
if [ ! -f runconfig.py ]; then
    cp runconfig.py.template runconfig.py
fi

# If the user hasn't made an app/config.py, create a default
# We point the default at the standard unicorn db
if [ ! -f app/config.py ]; then
  cat app/config.py.template | sed s/"<username>:<password>@<hostname>:<port>\/<db>"/"unicorn:unicorn@127.0.0.1:5432"/ | sed s/"''"/"'admin'"/ > app/config.py
fi

# delete any index call dossiers then recreate it (wipe it)
curl -XDELETE http://127.0.0.1:9200/dossiers/
curl -XPUT http://127.0.0.1:9200/dossiers/

# check the index size (should be 0 documents)
# curl http://127.0.0.1:9200/_cat/indices?v

# use curl to build our index. First, read in the mapping, then read in the data
# If you do not want to use the default mapping, comment this out.
curl -XPUT http://127.0.0.1:9200/dossiers/_mapping/attachment -d @dossiers_mapping.json

# print the mapping and make sure it looks like a large JSON object
# curl -XGET http://127.0.0.1:9200/dossiers/_mapping/attachment?pretty

# finally, load some dummy data
# If you do not want to use the dummy data, comment this out
curl -XPUT http://127.0.0.1:9200/dossiers/_bulk --data-binary @dossiers.json
python createdb.py


# clean up extra repositories
sudo apt-get autoremove -y
