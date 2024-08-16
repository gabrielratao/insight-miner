from bson import ObjectId
from fastapi import APIRouter

from app.main.database.db_mongo.db_mongo import MongoDB
from app.main.modules.utils.format_data import convert_object_id

router = APIRouter()

data = [
    {
        1: {
            'nome': 'joao',
            'idade': 23
        }
    }
]


@router.get("/news/test")
def read_root():
    return {"server status - news": "ok"}


@router.get('/news/{id_test}')
def read_news_test(id_test: int):
    print(id_test)
    return data[0].get(id_test, {})


# ler todas noticias
@router.get("/news")
def read_all_news():
    print('Listando todas as noticias')
    documents = MongoDB.read_all_documents(db_collection_name='news_content')
    documents = [convert_object_id(document) for document in documents]

    return {
        'result': documents[:10]
    }


# ler noticia por id
@router.post("/news")
def read_news_by_id(body: dict):
    object_id = body.get('object_id', None)
    document = MongoDB.read_document(db_collection_name='news_content', object_id=ObjectId(object_id))
    convert_object_id(document)
    return {
        'result': document
    }



# ler noticia por palavra chave
def read_all_news_by_key():
    pass


