from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .repository import ORMRepository
from .service import CommandHandler

some_engine = create_engine('sqlite:///')
Session = sessionmaker(bind=some_engine)
handler = CommandHandler(ORMRepository(Session()))
