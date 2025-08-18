from redis import Redis
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

class VectorStore:
    def __init__(self, redis_url: str, embedding_model: str):
        self.redis = Redis.from_url(redis_url)
        self.embedding_model = OpenAIEmbeddings(model=embedding_model)
        self.vector_store = Chroma(embedding_function=self.embedding_model)

    def add_document(self, document: str, metadata: dict):
        embedding = self.embedding_model.embed([document])[0]
        self.vector_store.add_texts(texts=[document], metadatas=[metadata], embeddings=[embedding])

    def search(self, query: str, k: int = 5):
        embedding = self.embedding_model.embed([query])[0]
        results = self.vector_store.similarity_search(embedding, k=k)
        return results

    def clear_store(self):
        self.vector_store.clear()