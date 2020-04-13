---
layout: post
title: My structure for DDD component
categories: [blog, ddd, python]
tags: [python, ddd, component, code architecture]
---
Draft of a post in answer to a StackOverflow
<a href="https://stackoverflow.com/questions/
59776634/ddd-with-python-did-i-get-it-right">
question</a>. You can find code used in this example
<a href="{{ site.github.repository_url }}
/tree/master/examples/ddd_component">here</a>.

# Commands
{% highlight python %}
@dataclass
class Create(Command):
    command_id: CommandID = field(default_factory=uuid1)
    timestamp: datetime = field(default_factory=datetime.utcnow)
{% endhighlight %}

<a href="{{ site.github.repository_url }}
/tree/master/examples/ddd_component/command.py">command.py</a>

# Application service
{% highlight python %}
class CommandHandler:
    def __init__(self, repository: Repository) -> None:
        self._repository = repository
        self._listeners: List[Listener] = []
        super().__init__()

    def register(self, listener: Listener) -> None:
        if listener not in self._listeners:
            self._listeners.append(listener)

    def unregister(self, listener: Listener) -> None:
        if listener in self._listeners:
            self._listeners.remove(listener)

    @safe
    def handle(self, command: Command) -> Event:
        uow: UnitOfWork = self._repository.get(command.uow_id)

        event: Event = app_event(self._handle(command, uow), command)
        for listener in self._listeners:
            listener(event)

        self._repository.save(uow)
        return event

    @singledispatchmethod
    def _handle(self, c: Command, u: UnitOfWork) -> UnitOfWork.Event:
        raise NotImplementedError

    @_handle.register(UpdateValue)
    def _(self, command: UpdateValue, uow: UnitOfWork) -> UnitOfWork.Event:
        return uow.update(command.value)
{% endhighlight %}
<a href="{{ site.github.repository_url }}
/tree/master/examples/ddd_component/service.py">service.py</a>

# Aggregate
{% highlight python %}
UnitOfWorkID = NewType('UnitOfWorkID', UUID)


class UnitOfWorkDTO:
    id: UnitOfWorkID
    value: Optional[Text]


class UnitOfWork:
    id: UnitOfWorkID
    dto: UnitOfWorkDTO

    class Event:
        pass

    class Updated(Event):
        pass

    def __init__(self, dto: UnitOfWorkDTO) -> None:
        self.id = dto.id
        self.dto = dto

    @classmethod
    def create(cls) -> 'UnitOfWork':
        dto = UnitOfWorkDTO()
        dto.id = UnitOfWorkID(uuid1())
        dto.value = None
        return UnitOfWork(dto)

    def update(self, value: Text) -> Updated:
        self.dto.value = value
        return self.Updated()
{% endhighlight %}
<a href="{{ site.github.repository_url }}
/tree/master/examples/ddd_component/uow.py">uow.py</a>


# Repository
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

{% highlight python %}
entities_t = Table = Table(
    'entities',
    meta,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('uuid', String, unique=True, index=True),
    Column('value', String, nullable=True),
)

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
<a href="{{ site.github.repository_url }}
/tree/master/examples/ddd_component/repository.py">repository.py</a>
