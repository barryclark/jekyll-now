https://medium.com/keeping-code/running-multiple-postgresql-versions-simultaneously-on-macos-linux-90b3d7e08ffd

issue with `postgresql-common`, no `initdb` for 9.6 solved : https://github.com/petere/homebrew-postgresql/issues/41#issuecomment-405048183

remember to put 9.6 in your path: export PATH="/usr/local/opt/postgresql@9.6/bin:\$PATH"

createcluster issue solved with: https://stackoverflow.com/a/8161863

if you have a timezone problem reboot your psql instance https://stackoverflow.com/questions/11409075/postgres-error-invalid-value-for-parameter-timezone-utc

you might need to grant SUPERUSER role to the user you are using for your db connection, so it can install extensions (ex.: hstore for rails, etc...)
https://github.com/diogob/activerecord-postgres-hstore/issues/99#issuecomment-59819920

You can create a cluster with: `pg_createcluster [options] <version> <name>`:

```
$ pg_createcluster 9.3 main
```

To start / stop the cluster:

```
pg_ctlcluster 9.6 main start
```

To list the clusters:

```
$ pg_lsclusters
```

to connect to it:

```
$ psql --cluster 9.3/main
```

or

```
psql -p <cluster-port-number> postgres
```

postgres=# CREATE DATABASE goldengate_test;
CREATE DATABASE
postgres=# CREATE DATABASE goldengate_development;
CREATE DATABASE
postgres=# CREATE USER goldengate;s
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE goldengate_test TO goldengate;
GRANT
postgres=# GRANT ALL PRIVILEGES ON DATABASE goldengate_development TO goldengate;
GRANT
postgres=#

Since there might be name overlaps with core Homebrew formulae, you should use fully qualified formula names like `brew install petere/postgresql/postgresql-common`.

install postgresql@10 with full qualified formula name
install postgis to postgresql@10 with pex: https://github.com/petere/homebrew-postgresql/issues/24#issuecomment-252485753
