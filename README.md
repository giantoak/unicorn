# unicorn
enriched document search

# Quick Start Installation
You can get up and running with unicorn very quickly using Vagrant and the **VagrantFile** that comes with the repository by running $vagrant up. This provisions an Ubuntu/trusty virtualbox image. 

Next, remove ".template" from runconfig.py and app/config.py. Within app/config.py make sure you set the *admin_username* and *admin_password*. You will use these for your first login. Also within app/config.py change the database connection string (*db_conn_str*). If you want to use our defaults embedded in **db_setup.sh** and **install.sh** you should set the *db_conn_str* to:

db_conn_str = 'postgresql://unicorn:unicorn@127.0.0.1:5432/'

Now, in the main directory, execute:

```$ . install.sh ; bash db_setup.sh ; python run.py```

Since the **Vagrantfile** is forwarding your port 5000 to your host, you should be able to navigate to http://localhost:5000/unicorn to access the application.


# Removing the default index
The quickstart comes pre-loaded with 1,000 historical documents from the National Archives. If you want to clear this out, run:

```$curl -XDELETE "http://localhost:9200/dossiers/" ; curl -XPUT "http://localhost:9200/dossiers/" 

$sudo elasticdump \
  --bulk=true \
  --input=dossiers_mapping.json \
  --output=http://localhost:9200/dossiers \
  --type=mapping \
  --debug=true```


# Configuring PostgreSQL
unicorn uses Postgres for user authentification. If you would like to alter the defaults on **db_conn_str**, prior to running the quickstart you can replace the values 'unicorn' within the **db_setup.sh** file to whatever you would like. You should only change:

```sudo -u postgres psql -c "CREATE USER unicorn WITH SUPERUSER CREATEROLE CREATEDB PASSWORD 'unicorn';"``` 
(change both instances of 'unicorn' to create a different default user). Note you then need to update the **db_conn_str**.