https://docs.djangoproject.com/en/2.1/ref/contrib/gis/tutorial/

# Installing GeoDjango

## Dependencies

### Database

Postgres with its PostGIS extension is is recommended, because it is the most mature and feature-rich open source spatial database.

```
$ brew install postgresql
$ brew install postgis
$ brew install gdal
$ brew install libgeoip
```

## Create a new project

Use the standard `django-admin` script to create a project called `geodjango`:

```
$ mkvirtualenv geodjango
$ pip install django
$ pip install psycopg2 # psql database binding
$ django-admin startproject geodjango
$ cd geodjango
$ setvirtualenvproject ~/.virtualenvs/geodjango ~/python-projects/geodjango
```

This will initialize a new project. Now, create a `world` Django application within the `geodjango` project:

```
$ cd geodjango
$ python manage.py startapp world
```

## Configure settings.py¶

The geodjango project settings are stored in the geodjango/settings.py file. Edit the database connection settings to match your setup:

```
DATABASES = {
    'default': {
         'ENGINE': 'django.contrib.gis.db.backends.postgis',
         'NAME': 'geodjango',
         'USER': 'geo',
    },
}
```

In addition, modify the INSTALLED_APPS setting to include django.contrib.admin, django.contrib.gis, and world (your newly created application):

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'world',
]
```
