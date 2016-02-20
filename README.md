# Unicorn
Unicorn is a python-based web framework used for exploratory analysis of text corpora.  Unicorn leverages many existing open source software projects to ingest documents, extract information, provide full-text search, and visually display relevant content.

# Quick Start Installation
You can get up and running with unicorn very quickly using [**Vagrant**](https://www.vagrantup.com/) and the provided [`Vagrantfile`](https://github.com/giantoak/unicorn/blob/master/Vagrantfile) to provision an [Ubuntu Trusty Tahr](https://wiki.ubuntu.com/TrustyTahr/ReleaseNotes) virtual machine with all of the necessary software:

```
$ git clone https://github.com/giantoak/unicorn.git
$ cd unicorn
$ vagrant up
$ vagrant ssh
> cd /vagrant
```

Next, make usable copies of `runconfig.py` and `app/config.py` from their template files:

```
> cp runconfig.py.template runconfig.py
> cp app/config.py.template app/config.py
```

Within `app/config.py`, change `admin_username` and `admin_password` from the defaults of `''` and `''`; You'll use these for your first login. You'll also need to change the database connection string `db_conn_str` from the default of `'postgresql://<username>:<password>@<hostname>:<port>/<db>'` to point to your database. If you want to use the default database defined in [`db_setup.sh`](https://github.com/giantoak/unicorn/blob/master/db_setup.sh) and [`install.sh`](https://github.com/giantoak/unicorn/blob/master/install.sh), you should set `db_conn_str` to `'postgresql://unicorn:unicorn@127.0.0.1:5432/'`

Now, in the main directory, execute:

```
> bash install.sh
```

Since the [`Vagrantfile`](https://github.com/giantoak/unicorn/blob/master/Vagrantfile) is forwarding your port 5000 to your host, you should be able to navigate to [http://localhost:5000/unicorn](http://localhost:5000/unicorn) to access the application.


# Removing the default index
The database comes pre-loaded with 1,000 historical documents from the National Archives for demonstration purposes. If you want to clear them out, run:

```
> curl -XDELETE "http://localhost:9200/dossiers/"
> curl -XPUT "http://localhost:9200/dossiers/"
> sudo elasticdump \
  --bulk=true \
  --input=dossiers_mapping.json \
  --output=http://localhost:9200/dossiers \
  --type=mapping \
  --debug=true
```

# Configuring PostgreSQL
Unicorn stores user authentication data in a [PostgreSQL](http://www.postgresql.org/) database. By default, it creates a user named `unicorn` and stores these records in a database named `unicorn`. To change these defaults in `db_conn_str`, prior to running `install.sh` you can replace the values 'unicorn' within the `db_setup.sh` file to whatever you would like and update `db_conn_str` to refer to the new value.

# PDF Viewer
Unicorn requires a browser plug-in to render PDFs called PDF Viewer. It's available [here](https://chrome.google.com/webstore/detail/pdf-viewer/oemmndcbldboiebfnladdacbdfmadadm) for Google Chrome and [here](https://addons.mozilla.org/en-US/firefox/addon/pdfjs/) for Firefox. Unicorn should work natively with Safari.


# License
Unicorn is under ongoing development and is freely available for download under The MIT License (MIT) open source licensing. Unlike GNU General Public License (GPL), MIT freely permits distribution of derivative work under proprietary license, without requiring the release of source code.

# Acknowledgements
 This project was funded by DARPA under part of the XDATA program.
