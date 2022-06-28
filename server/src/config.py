from pydantic import BaseSettings


class Settings(BaseSettings):
    sqlalchemy_database_url: str = "postgresql://postgres:test@localhost:5432/postgres"
    enable_cors: bool = False

    class Config:
        env_file = '.conanio-env'
        env_file_encoding = 'utf-8'

settings = Settings()
