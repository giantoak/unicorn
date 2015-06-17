#!/bin/sh

sudo -u postgres psql -c "CREATE USER unicorn WITH SUPERUSER CREATEROLE CREATEDB PASSWORD 'unicorn';"

sudo -u postgres psql -c "CREATE DATABASE unicorn;"

python createdb.py
