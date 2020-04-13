from typing import NewType, Text, Optional
from uuid import UUID, uuid1

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
