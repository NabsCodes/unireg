from collections.abc import Iterator
from contextlib import contextmanager

from psycopg import Connection
from psycopg_pool import ConnectionPool

from app.core.config import settings

pool = ConnectionPool(conninfo=settings.database_url, open=False)


@contextmanager
def get_connection() -> Iterator[Connection]:
    with pool.connection() as connection:
        yield connection

