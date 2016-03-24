# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 3306, host: 3306
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 5432, host: 5432
  config.vm.network "forwarded_port", guest: 9200, host: 9200


 # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.111.192.111"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
   config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
     vb.memory = "8184"
   end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
  # Initial setup
  apt-get -y update && apt-get -y upgrade
  apt-get install -y curl git
  # apt-get install -y g++ g++-4.8 libstdc++-4.8-dev cmake libopenblas-dev liblapack-dev
  export ES_VER=1.7.5
  export MAPPER_VER=2.7.1
  export CARROT_VER=1.9.1
  export UNICORN_HOME=/home/vagrant/unicorn

  # Get conda
  curl http://repo.continuum.io/miniconda/Miniconda-latest-Linux-x86_64.sh --output ~/miniconda.sh
  bash ~/miniconda.sh -b -p /usr/local/miniconda
  bash -c "echo 'export PATH=/usr/local/miniconda/bin:$PATH' > /etc/profile.d/prepend_conda.sh"
  export PATH=/usr/local/miniconda/bin:$PATH
  rm ~/miniconda.sh
  chown -R vagrant /usr/local/miniconda
  chgrp -R vagrant /usr/local/miniconda
  conda config --add channels pmlandwehr
  conda config --add channels auto

  # Copy, enter, and clean repo
  cp -r /vagrant $UNICORN_HOME
  cd $UNICORN_HOME
  rm -rf Vagrantfile Dockerfile .dockerignore README.md *.git *.template
  conda install -y --file requirements.txt
  conda install -y openssl && conda upgrade -y openssl python

  # Set up postgres
  apt-get install -y postgresql postgresql-contrib python-psycopg2 libpq-dev
  service postgresql start
  sudo -u postgres psql -c "CREATE USER unicorn WITH SUPERUSER CREATEROLE CREATEDB PASSWORD 'unicorn';"
  sudo -u postgres psql -c "CREATE DATABASE unicorn;"

  # Set up mysql
  # Only needs to be installed if we're using geodict
  # debconf-set-selections <<< 'mysql-server mysql-server/root_password password geodict_root'
  # debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password geodict_root'
  # apt-get -y install mysql-server mysql-client libmysqlclient-dev

  # Get SSL libraries
  apt-get install -y libssl-dev libffi-dev

  # Install NLTK dependencies
  python -m nltk.downloader -d /usr/local/share/nltk_data stopwords
  python -m nltk.downloader -d /usr/local/share/nltk_data punkt

  # Install unoconv
  apt-get install -y unoconv

  # Clone the geodict library into the local dir.
  # It isn't a module
  # Geodict is only needed if you want to re-enable
  # on-the-fly location extaction
  # git clone https://github.com/giantoak/geodict $UNICORN_HOME/geodict

  # Start MySQL if it's off and populate with geodict data
  # Only needs to be enabled if we're using geodict
  # service mysql start
  # cd $UNICORN_HOME/geodict
  # python populate_database.py
  # cd $UNICORN_HOME

  # Initialize unoconv
  unoconv -l &

  # Run elasticsearch as a service set up script
  bash ElasticSearch.sh $ES_VER

  # stop elasticsearch
  sudo service elasticsearch stop

  # install the elasticsearch mapper attachment plugin
  /usr/share/elasticsearch/bin/plugin --install elasticsearch/elasticsearch-mapper-attachments/$MAPPER_VER

  # install the elasticsearch carrot2 plugin
  /usr/share/elasticsearch/bin/plugin --install org.carrot2/elasticsearch-carrot2/$CARROT_VER

  # Reboot elasticsearch as a service, load dossiers
  service elasticsearch start
  sleep 10
  curl -XPUT http://127.0.0.1:9200/dossiers/
  curl -XPUT http://127.0.0.1:9200/dossiers/_mapping/attachment -d @dossiers_mapping.json
  curl -XPUT http://127.0.0.1:9200/dossiers/_bulk --data-binary @dossiers.json

  cp $UNICORN_HOME/app/config.py.default $UNICORN_HOME/app/config.py
  mv $UNICORN_HOME/app/config.py.default $UNICORN_HOME/app/util/config.py
  python createdb.py

  # clean up extra repositories
  apt-get autoremove -y

  chown -R vagrant /home/vagrant/unicorn
  chgrp -R vagrant /home/vagrant/unicorn
  SHELL
end
