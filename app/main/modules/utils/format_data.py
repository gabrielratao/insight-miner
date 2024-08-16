from bson import ObjectId


def convert_object_id(document: dict) -> dict:
    """
    Converte todos os ObjectId de um documento para strings.
    """
    if isinstance(document, dict):
        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)

    return document
