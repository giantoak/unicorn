# Unicorn
Unicorn is a python-based web framework used for exploratory analysis of text corpora.  Unicorn leverages many existing open source software projects to ingest documents, extract information, provide full-text search, and visually display relevant content.

# Quick Start Installation with [Vagrant](https://www.vagrantup.com/)
You can get up and running with unicorn very quickly using Vagrant and the provided [`Vagrantfile`](https://github.com/giantoak/unicorn/blob/master/Vagrantfile) to provision an [Ubuntu Trusty Tahr](https://wiki.ubuntu.com/TrustyTahr/ReleaseNotes) virtual machine with all of the necessary software:

```
$ git clone https://github.com/giantoak/unicorn.git
$ cd unicorn
$ vagrant up # this will take a while, as vagrant will run the install script
$ vagrant ssh
> cd unicorn
> ./start_unicorn.sh
```

In your browser, go to [http://localhost:5000/unicorn](http://localhost:5000/unicorn) (the box's private IP) and use the default username (`admin`) and password (`admin`) to browse the default data: a collection of state-department cables.




```
```

## Prerequisites
The installer assumes that you have a Linux/BSD environment, `sudo` permissions, `bash`, an access to the `apt-get` package manager - in essence, [Ubuntu.](http://www.ubuntu.com/) You should be able to swap out `apt-get` for your package manager of choice in order to make it friendly to other unices.

In the following installed:
* [`git`](https://git-scm.com/)
* [`curl`](https://curl.haxx.se/)
* [`python 2.7`](https://www.python.org/)
* The prerequisites for [`scikit-learn`](http://scikit-learn.org/). The easiest way to meet those is probably to use the [conda](http://conda.pydata.org/docs/) python distribution.

## Customizing what's installed.
[`install.sh`.](https://github.com/giantoak/unicorn/blob/master/install.sh) will install several pieces of helper software
* [Elasticsearch 1.7.8](https://www.elastic.co/downloads/past-releases/elasticsearch-1-7-8) for files
* [PostgreSQL](http://www.postgresql.org/) for authorization
* [MySQL](https://www.mysql.com/) for the [`geodict`](https://github.com/giantoak/geodict) library for python.
* A (local) copy of [`geodict`](https://github.com/giantoak/geodict)
* The python libraries specified in [`requirements.txt`.](https://github.com/giantoak/unicorn/blob/master/requirements.txt)

If you want to tweak any of these settings, you can do so by editing [`install.sh`.](https://github.com/giantoak/unicorn/blob/master/install.sh) Detailed instructions for doing so go beyond the scope of this README.

## The default run and Postgres configurations
If `install.sh` doesn't see a copy of `runconfig.py` or `app/config.py`, it will create instances of each from the default versions ([`runconfig.py.default`](https://github.com/giantoak/unicorn/blob/master/runconfig.py.default) and ['app/config.py.default'](https://github.com/giantoak/unicorn/blob/master/app/config.py.default)). In doing so it will set a default username and password of `admin` and `admin` for Unicorn and will use the default instance of Postgres for storage.

## The default MySQL configuration
When installing MySQL, `install.sh` will set a a default password of `geodict_root` for root. If you want to use a different password you can. However, you will need to update the password stored in [`geodict_config.py`](https://github.com/giantoak/geodict/blob/master/geodict_config.py) in the cloned copy of [`geodict`](https://github.com/giantoak/geodict) that `install.sh` will create.

## The default Elasticsearch index
The database comes pre-loaded with 1,000 historical documents from the National Archives for demonstration purposes. If you want to clear them out, run:

```
> curl -XDELETE "http://localhost:9200/dossiers/"
> curl -XPUT "http://localhost:9200/dossiers/"
> curl -XPUT "http://localhost:9200/dossiers/_mapping/attachment" -d @dossiers_mapping.json
```

# PDF Viewer
Unicorn requires a browser plug-in to render PDFs called PDF Viewer. It's available [here](https://chrome.google.com/webstore/detail/pdf-viewer/oemmndcbldboiebfnladdacbdfmadadm) for Google Chrome and [here](https://addons.mozilla.org/en-US/firefox/addon/pdfjs/) for Firefox. Unicorn should work natively with Safari.

# License
Unicorn is under ongoing development and is freely available for download under The MIT License (MIT) open source licensing. Unlike GNU General Public License (GPL), MIT freely permits distribution of derivative work under proprietary license, without requiring the release of source code.

# Acknowledgements
 This project was funded by [DARPA](http://www.darpa.mil) under part of the [XDATA program](http://www.darpa.mil/program/xdata).
