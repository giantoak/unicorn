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
  apt-get -y update && apt-get -y upgrade && apt-get -y autoremove
  apt-get install -y curl git
  curl http://repo.continuum.io/miniconda/Miniconda-latest-Linux-x86_64.sh --output ~/miniconda.sh
  bash ~/miniconda.sh -b -p /usr/local/miniconda
  bash -c "echo 'export PATH=/usr/local/miniconda/bin:$PATH' > /etc/profile.d/prepend_conda.sh"
  export PATH=/usr/local/miniconda/bin:$PATH
  rm ~/miniconda.sh
  chown -R vagrant /usr/local/miniconda
  chgrp -R vagrant /usr/local/miniconda
  conda install -y pip
  conda config --add channels pmlandwehr
  conda config --add channels auto
  cp -r /vagrant /home/vagrant/unicorn
  cd /home/vagrant/unicorn
  rm Vagrantfile Dockerfile .dockerignore README.md
  rm -rf *.git
  sed s/==/=/ requirements.txt > conda_reqs.txt
  conda install -y --file conda_reqs.txt
  conda install -y openssl
  conda upgrade -y openssl
  conda upgrade -y python
  rm conda_reqs.txt
  ./install.sh
  chown -R vagrant /home/vagrant/unicorn
  chgrp -R vagrant /home/vagrant/unicorn
  SHELL
end
