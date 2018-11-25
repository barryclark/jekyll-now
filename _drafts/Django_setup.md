# How to install Django and build a small poll app

This is a walkthough of the [Writing your first Django app](https://docs.djangoproject.clsom/en/2.1/intro/tutorial01/) tutorial from the Django documentation.

## Setup and Django installation

If you have read the previous article on how to setup python 3 and virtual environments, you can follow along the following code, otherwise use your judgment :)

You could host all your python projects under a `python-projects` directory in your home, create a new virtual environment for your new project, install Django in it, and start a new Django project with:

```
$ mkvirtualenv mysite
$ pip install django
$ django-admin startproject mysite
$ cd mysite
$ setvirtualenvproject ~/.virtualenvs/pollap ~/python-projects/mysite
```

Don't forget to initialize a git project in your project folder with:

```
$ git init
```

And now you should be able, after getting out of the directory and your new virtual environment

```
$ cd
$ deactivate
```

to get back right to it with your virtual environment setup with:

```
$ workon mysite
```

## Getting to work:

> NB: the files in your Django project:
> Let’s look at what `startproject` created:

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

These files are:

The outer mysite/ root directory is just a container for your project. Its name doesn’t matter to Django; you can rename it to anything you like.
manage.py: A command-line utility that lets you interact with this Django project in various ways. You can read all the details about manage.py in django-admin and manage.py.
The inner mysite/ directory is the actual Python package for your project. Its name is the Python package name you’ll need to use to import anything inside it (e.g. mysite.urls).
mysite/**init**.py: An empty file that tells Python that this directory should be considered a Python package. If you’re a Python beginner, read more about packages in the official Python docs.
mysite/settings.py: Settings/configuration for this Django project. Django settings will tell you all about how settings work.
mysite/urls.py: The URL declarations for this Django project; a “table of contents” of your Django-powered site. You can read more about URLs in URL dispatcher.
mysite/wsgi.py: An entry-point for WSGI-compatible web servers to serve your project. See How to deploy with WSGI for more details.

Start the server:

```
$ python manage.py runserver
```

and go to: http://127.0.0.1:8000/ to check that everything is ok

### Projects vs. apps

What’s the difference between a project and an app? An app is a Web application that does something – e.g., a Weblog system, a database of public records or a simple poll app. A project is a collection of configuration and apps for a particular website. A project can contain multiple apps. An app can be in multiple projects.

The project would be the website, the apps different specific purposes building bricks.

## Create a poll app

```
python manage.py startapp polls
```

## Write your first view¶

The view

```
# polls/views.py
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

To call the view, we need to map it to a URL - and for this we need a URLconf.

The route of you application

```
#polls/urls.py¶

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

The route of the framework:

```
# mysite/urls.py¶
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')), # delegates the route /polls to the polls app. !
    path('admin/', admin.site.urls),
]
```

The idea behind include() is to make it easy to plug-and-play URLs. Since polls are in their own URLconf (polls/urls.py), they can be placed under “/polls/”, or under “/fun_polls/”, or under “/content/polls/”, or any other path root, and the app will still work.

Go to http://localhost:8000/polls/ in your browser, and you should see the text “Hello, world. You’re at the polls index.”, which you defined in the index view.

> Further reading: https://docs.djangoproject.com/en/2.1/ref/urls/#django.urls.path

## Database setup using PSQL

We will here use PostgreSQL, if you don't have it installed use homebrew :)

Install the appropriate [database binding](https://docs.djangoproject.com/en/2.1/topics/install/#database-installation).

```
pip install psycopg2
```

Create a database for you site:

Use the psql command line:

```
$ psql postgres
postgres=# CREATE DATABSE mysite;
```

In the `settings.py` file, under the default key of the `DATABASES` object:

```
'ENGINE': 'django.db.backends.postgresql',
'NAME': 'mysite',
'USER': 'postgres'
```

## Creating models¶

In our simple poll app, we’ll create two models: Question and Choice. A Question has a question and a publication date. A Choice has two fields: the text of the choice and a vote tally. Each Choice is associated with a Question.

These concepts are represented by simple Python classes. Edit the polls/models.py file so it looks like this:

```
# polls/models.py¶
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

## Activating the application in the framework

You need to tell Django that your poll app is installed.

```
#mysite/settings.py¶
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

Now Django knows to include the polls app. Let’s run another command to create the migration files:

```
$ python manage.py makemigrations polls
```

and then `$ python manage.py migrate` to run them against the DB.

[Time to play](https://docs.djangoproject.com/en/2.1/intro/tutorial02/#playing-with-the-ap) with the [database API](https://docs.djangoproject.com/en/2.1/topics/db/queries/]

## The admin tool

### Creating an admin user

```
$ python manage.py createsuperuser
```

### Make the poll app modifiable in the admin¶

```
polls/admin.py¶
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```

Go to 127.0.0.1/admin/

## Writing more views¶

These views take in arguments:

```
polls/views.py¶
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
    ;
```

write them in the polls.urls module using [`path()`](https://docs.djangoproject.com/en/2.1/ref/urls/#django.urls.path) calls

```
polls/urls.py¶
from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

## Write views that actually do something

```
#polls/views.py

from django.http import HttpResponse

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)

# Leave the rest of the views (detail, results, vote) unchanged
```

### Raising a 404 error¶

Now, let’s tackle the question detail view – the page that displays the question text for a given poll. Here’s the view:

```
#polls/views.py¶
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})

```

```
polls/templates/polls/detail.html¶
{{ question }}
```

### Use the template system¶

Back to the detail() view for our poll application. Given the context variable question, here’s what the polls/detail.html template might look like:

polls/templates/polls/detail.html¶

<h1>{{ question.question_text }}</h1>
<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }}</li>
{% endfor %}
</ul>

See the [template guide](https://docs.djangoproject.com/en/2.1/topics/templates/) for more detail

### Removing hardcoded URLs in templates

In the polls/index.html template this

```
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
```

can be changed to this

```
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

The way this works is by looking up the URL definition as specified in the polls.urls module. You can see exactly where the URL name of ‘detail’ is defined below:

```
# the 'name' value as called by the {% url %} template tag
path('<int:question_id>/', views.detail, name='detail'),
```

If you want to change the URL of the polls detail view to something else, perhaps to something like polls/specifics/12/ instead of doing it in the template (or templates) you would change it in polls/urls.py:

```
# added the word 'specifics'
path('specifics/<int:question_id>/', views.detail, name='detail'),
```

### Namespacing URL names

```
# polls/urls.py¶
from django.urls import path

from . import views

app_name = 'polls' # namespace for our routes
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]

```

Now change your polls/index.html template from:

# polls/templates/polls/index.html

```
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

to point at the namespaced detail view:

```
# polls/templates/polls/index.html
<li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
```

https://docs.djangoproject.com/en/2.1/intro/tutorial04/
