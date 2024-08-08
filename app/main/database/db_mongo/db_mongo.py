from dataclasses import dataclass
from typing import List

from pymongo import MongoClient
from bson.objectid import ObjectId

from app.main import properties


class MongoDB:
    def __init__(self):
        self.db_name: str = properties.mongo_db.get('db_name', '')
        # self.db_collection_name: str = properties.mongo_db.get('colection_name', '')
        self.uri: str = properties.mongo_db.get('uri', '')

        client = MongoClient(self.uri)
        self.db = client[self.db_name]

    def read_documents(self, db_collection_name):
        db_collection = self.db[db_collection_name]
        documents = db_collection.find()

        return list(documents)


mongo = MongoDB()

mongo.read_documents(
    db_collection_name='news_content'
)
