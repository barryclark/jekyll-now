from abc import ABC
from dataclasses import dataclass, field
from datetime import datetime
from typing import Text
from uuid import UUID, uuid1

from examples.ddd_component.uow import UnitOfWorkID

CommandID = UUID


class Command(ABC):
    uow_id: UnitOfWorkID
    command_id: CommandID
    timestamp: datetime


@dataclass
class Create(Command):
    command_id: CommandID = field(default_factory=uuid1)
    timestamp: datetime = field(default_factory=datetime.utcnow)


@dataclass
class UpdateValue(Command):
    uow_id: UnitOfWorkID
    value: Text
    command_id: CommandID = field(default_factory=uuid1)
    timestamp: datetime = field(default_factory=datetime.utcnow)
