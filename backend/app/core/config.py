from functools import cached_property

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "UniReg API"
    environment: str = "development"
    database_url: str = "postgresql://unireg:unireg@localhost:5432/unireg"
    backend_cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    jwt_secret_key: str = "change-me-before-demo"

    @cached_property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.backend_cors_origins.split(",")
            if origin.strip()
        ]


settings = Settings()

