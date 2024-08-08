from fastapi import APIRouter


router = APIRouter()


@router.get("/news/test")
def read_root():
    return {"server status - news": "ok"}


@router.get("/news")
def read_news():
    return {'teste': 'pl'}
