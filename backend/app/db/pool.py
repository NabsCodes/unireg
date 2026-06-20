from collections.abc import Iterator
from contextlib import contextmanager

from psycopg import Connection
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

from app.core.config import settings

pool = ConnectionPool(
    conninfo=settings.database_url,
    kwargs={"row_factory": dict_row},
    open=False,
)


def ensure_pool_open() -> None:
    if pool.closed:
        pool.open(wait=True)


@contextmanager
def get_connection() -> Iterator[Connection]:
    ensure_pool_open()
    with pool.connection() as connection:
        yield connection
