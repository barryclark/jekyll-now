---
layout: post
title: Persistency of DDD aggregate
categories: [ddd, stackoverflow]
tags: [python, DDD, persistency, sqlalchemy, stackoverflow]
---

Post in answer to a StackOverflow questions
"<a href="https://stackoverflow.com/questions/51406836/sqlalchemy-and-ddd">SQLAlchemy and DDD</a>" and "<a href="https://stackoverflow.com/questions/59021614/persist-pojos-in-python-using-a-ddd-approach">Persist POJOs in Python using a DDD approach</a>".

 You can find code used in this example
<a href="{{ site.github.repository_url }}/tree/master/examples/">here</a>.

# DTO
Having out DDD component I want to separation from DTO used by our aggregate and repository implementation. I introduce interface for DTO that will be delivered by the repository.

Why not dataclass (or attrs) or namedtuple? Cause I assume that for ORM repository it's convenient to use DB Model as DTO and this cannot be immutable. Using for example dataclass we are adding more to this interface that will conflict with sqlalchemy model or Django Model. We need also remember that all data structured in our DTO needs to meet to this constraints.

If you want to fully separate your domain code from any kind of constraints from repository I recommend to use <a href="https://mappers.readthedocs.io/en/latest/">dry-python/mappers</a>. Library created exacly for this purpose.

{% highlight python %}
class UnitOfWorkDTO:
    id: UnitOfWorkID
    value: Optional[Text]
{% endhighlight %}

# DB structure
We want to have 1 to 1 corelation between DTO and DB structure but it may not be true with time. Thats why I separate DTO from DB structure and in case of SQLAlchemy I use mappers instead of declarative DB Model. DB can have relations to other components that are not reflected in DTO or domain model. For example for domain UserId is just enought and should not have access to any other User data. In DB we can use relations to other tables. It can be usefull for admin panels based on Models (Django or simple implementation of flask-admin). But we need also to be very carefull with this and for admin panels in DDD i recommend to implement read-only mode. Writing directly to DTO destroys whole idea of DDD component.

{% highlight python %}
entities_t: Table = Table(
    'entities',
    meta,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('uuid', String, unique=True, index=True),
    Column('value', String, nullable=True),
)
{% endhighlight %}

# DTO Mapping
We need also configure mapping corectly. If there is relation to not used collection, just don't map it or use it in lazy mode. DTO should be read from DB in one query and it should read only data used in domain. 
SQLAlchemy mappers gives you a lot of tools to map different structure of   db tables to objects, but still it's limited. So we need to aim to be as close between dto and db structure as possible.

Mappers are activated by mapper function and in most cases it's places directly in module file. So ingration on our DTO (adding sqlalchemy columns to DTO class) will ativate when this module use executed (on import). If you want to separate this mapping for unittest you need to reorganize you application a little and properly use containers for dependency injection but this is topic for other article. Other aprach is to use declarative model which is implementing DTO intreface.

{% highlight python %}
UnitOfWorkMapper = mapper(
    UnitOfWorkDTO,
    entities_t,
    properties={
        'id': entities_t.c.uuid,
        'value': entities_t.c.value,
    },
    column_prefix='_db_column_',
)
{% endhighlight %}

# Repository
Simplest aproach to reposotory is just reading and writing DTOs. If you use dynamic mappers like <a href="https://mappers.readthedocs.io/en/latest/">dry-python/mappers</a> resposibility of loading and saving DTO will be on repository.

Another interesting thing that is in resposibility of repository is realible event sending. Instead of sending component events directly to listeners we store them in same transaction in DB. Then async worker is sending events to listeners. This aproach save us from problems when we store aggregate to DB but something breaks (network? kill on process etc.) and our events wont be delivered to listeners. When we store them in same transaction we are sure that aggregate state and generated events are consistent with each other. It this scenario only when you kill worker on sending it will send same event twice. So this solution is 'at least send once'. But having eventID receiver can easly ignore events send twice.

{% highlight python %}
class ORMRepository(Repository):
    def __init__(self, session: Session):
        self._session = session
        self._query = self._session.query(UnitOfWorkMapper)

    def get(self, uow_id: UnitOfWorkID) -> UnitOfWork:
        dto = self._query.filter_by(uuid=uow_id).one_or_none()
        if not dto:
            raise NotFound(uow_id)
        return UnitOfWork(dto)

    def save(self, uow: UnitOfWork) -> None:
        self._session.add(uow.dto)
        self._session.flush()
{% endhighlight %}
<a href="{{ site.github.repository_url }}/tree/master/examples/ddd_component/repository.py">repository.py</a>

# Migrations
This one is interesting topic. In modular monolith we are in situation where we can have some common used db tables (for example users) and separate structure for every component that we have. For this I separate migrations for ddd components and store them in component package and common migrations in main migration package. <a href="https://alembic.sqlalchemy.org/en/latest/">Alembic</a> supports this with <a href="https://alembic.sqlalchemy.org/en/latest/branches.html#working-with-multiple-bases">multiple bases</a>. Every component have each own migration branch. Ideal situation is to use no dependency on other components or only on base component. Whole idea with modular monolith base on this so whenever there is another case you should check if you split your domain propely. 

If you have architecture with one component per microservice sitaution is easier cause there is natural split of DB. Also it's good practice to have separate DB for every component. But remember that splitting domain to soon in wrong places can cause problems later when you need to refactor it and you need to change many microservices and migrate data from one to another DB. 

{% highlight ini %}
[alembic]
script_location = alembic/
version_locations = alembic/migrations/ ddd_component/migrations/
file_template = %%(year)d-%%(month).2d-%%(day).2d_%%(slug)s_%%(rev)s
{% endhighlight %}
<a href="{{ site.github.repository_url }}/tree/master/examples/alembic.ini">alembic.ini</a>

{% highlight shell %}
$ alembic -c alembic.ini init
$ alembic -c alembic.ini revision -m "User"
$ alembic -c alembic.ini revision -m "DDD component UnitOfWork" --head=base --depends-on=@heads --branch-label=ddd_component --version-path=ddd_component/migrations/
$ alembic -c alembic.ini upgrade heads
{% endhighlight %}
<a href="https://alembic.sqlalchemy.org/en/latest/branches.html#working-with-multiple-bases">Alembic with multiple bases</a>

{% highlight python %}
revision = '93d219eb7328'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('email', sa.String(255), nullable=False, unique=True),
    )
{% endhighlight %}

<a href="{{ site.github.repository_url }}/tree/master/examples/alembic/migrations/2020-04-15_user_93d219eb7328.py">User migration</a>

{% highlight python %}
revision = '18fd763a02a4'
down_revision = None
branch_labels = ('ddd_component',)
depends_on = '93d219eb7328'

def upgrade():
    op.create_table(
        'entities',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('uuid', sa.String, unique=True, index=True),
        sa.Column('value', sa.String, nullable=True),
    )
{% endhighlight %}
<a href="{{ site.github.repository_url }}/tree/master/examples/ddd_component/migrations/2020-04-15_ddd_component_unitofwork_18fd763a02a4.py">Unit of work migration</a>
