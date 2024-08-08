from fastapi import FastAPI

from app.main.roots import root_news

app = FastAPI()


app.include_router(root_news.router, prefix="/api")
