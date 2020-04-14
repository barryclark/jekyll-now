from dataclasses import dataclass, field
from datetime import datetime
from functools import singledispatch
from uuid import UUID, uuid1

from .commands import Command, CommandID
from .uow import UnitOfWork, UnitOfWorkID

EventID = UUID


class Event:
    command_id: CommandID
    event_id: EventID = field(default_factory=uuid1)
    timestamp: datetime = field(default_factory=datetime.utcnow)


@dataclass
class Created(Event):
    command_id: CommandID
    uow_id: UnitOfWorkID
    event_id: EventID = field(default_factory=uuid1)
    timestamp: datetime = field(default_factory=datetime.utcnow)


@dataclass
class Updated(Event):
    command_id: CommandID
    event_id: EventID = field(default_factory=uuid1)
    timestamp: datetime = field(default_factory=datetime.utcnow)


@singledispatch
def app_event(event: UnitOfWork.Event, command: Command) -> Event:
    raise NotImplementedError


@app_event.register(UnitOfWork.Updated)
def _(event: UnitOfWork.Updated, command: Command) -> Updated:
    return Updated(command.command_id)
