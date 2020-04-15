"""User

Revision ID: 93d219eb7328
Revises: 
Create Date: 2020-04-15 16:00:18.696276

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
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


def downgrade():
    op.drop_table('users')
