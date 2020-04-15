"""DDD component UnitOfWork

Revision ID: 18fd763a02a4
Revises: 
Create Date: 2020-04-15 16:13:55.988371

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
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


def downgrade():
    op.drop_table('entities')
