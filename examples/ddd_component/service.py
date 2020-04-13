from abc import ABC, abstractmethod
from functools import singledispatchmethod
from typing import List, Callable

from returns.result import safe

from .commands import Command, Create, UpdateValue
from .events import Created, Event, app_event
from .uow import UnitOfWorkID, UnitOfWork

Listener = Callable[[Event], None]


class Repository(ABC):
    @abstractmethod
    def get(self, uow_id: UnitOfWorkID) -> UnitOfWork:
        raise NotImplementedError

    @abstractmethod
    def save(self, uow: UnitOfWork) -> None:
        raise NotImplementedError


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
    @singledispatchmethod
    def handle(self, command: Command) -> Event:
        uow: UnitOfWork = self._repository.get(command.uow_id)

        event: Event = app_event(self._handle(command, uow), command)
        for listener in self._listeners:
            listener(event)

        self._repository.save(uow)
        return event

    @safe
    @handle.register(Create)
    def create(self, command: Create) -> Event:
        uow = UnitOfWork.create()
        self._repository.save(uow)
        return Created(command.command_id, uow.id)

    @singledispatchmethod
    def _handle(self, c: Command, u: UnitOfWork) -> UnitOfWork.Event:
        raise NotImplementedError

    @_handle.register(UpdateValue)
    def _(self, command: UpdateValue, uow: UnitOfWork) -> UnitOfWork.Event:
        return uow.update(command.value)
