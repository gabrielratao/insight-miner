from dataclasses import dataclass
from typing import List, Dict

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

    def read_all_documents(self,
                           db_collection_name: str
                           ):
        db_collection = self.db[db_collection_name]
        documents = db_collection.find()

        return list(documents)

    def read_document(self,
                      db_collection_name: str,
                      object_id: ObjectId
                      ):
        db_collection = self.db[db_collection_name]
        document = db_collection.find_one(ObjectId(object_id))  # '665e4d6f0e9a907afa51c60e'))

        return document

    def read_documents_by_query(self, db_collection_name: str, query: dict):
        db_collection = self.db[db_collection_name]
        documents = db_collection.find(query)

        return documents

    def insert_document(self,
                        db_collection_name: str,
                        document: dict):
        db_collection = self.db[db_collection_name]
        response = db_collection.insert_one(document)

        return response.inserted_id

    def update_document(self,
                        db_collection_name: str,
                        query_filter: dict,  # query para obter o documento a ser atualizado
                        update_operation: Dict[str, str]):  # valores que serão alterados

        db_collection = self.db[db_collection_name]
        update_operation = {
            '$set': update_operation
        }

        response = db_collection.update_one(query_filter, update_operation)

        if response.modified_count > 1:
            return True
        else:
            return False

    def delete_document(self,
                        db_collection_name: str,
                        query_filter: dict):

        db_collection = self.db[db_collection_name]
        response = db_collection.delete_one(query_filter)

        if response.deleted_count == 1:
            return True
        else:
            return False


mongo = MongoDB()

mongo.read_documents(
    db_collection_name='news_content'
)
