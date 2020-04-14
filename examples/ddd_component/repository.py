from sqlalchemy import Table, Column, String, Integer, MetaData
from sqlalchemy.orm import mapper, Session

from . import UnitOfWorkID
from .exceptions import NotFound
from .service import Repository
from .uow import UnitOfWorkDTO, UnitOfWork

meta = MetaData()

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
