from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from typing import List, Dict, Any, Optional
import os
from pathlib import Path

from config.settings import settings

class VectorStore:
    """
    Vector store for document retrieval and RAG functionality
    """
    def __init__(self):
        """
        Initialize the vector store with settings from config
        """
        self.embedding_model = OpenAIEmbeddings(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.EMBEDDING_MODEL
        )
        
        # Create path if it doesn't exist
        os.makedirs(settings.VECTOR_DB_PATH, exist_ok=True)
        
        # Initialize ChromaDB
        self.vector_store = Chroma(
            persist_directory=settings.VECTOR_DB_PATH,
            embedding_function=self.embedding_model
        )
    
    def add_document(self, text: str, metadata: Dict[str, Any]) -> str:
        """
        Add a document to the vector store
        
        Args:
            text (str): The document text
            metadata (Dict[str, Any]): Metadata for the document
            
        Returns:
            str: Document ID
        """
        ids = self.vector_store.add_texts(texts=[text], metadatas=[metadata])
        return ids[0]
    
    def search(self, query: str, k: int = 5) -> List[Dict[str, Any]]:
        """
        Search the vector store for relevant documents
        
        Args:
            query (str): The search query
            k (int): Number of results to return
            
        Returns:
            List[Dict[str, Any]]: Search results with documents and metadata
        """
        try:
            results = self.vector_store.similarity_search_with_relevance_scores(query, k=k)
            
            # Format the results
            formatted_results = []
            for doc, score in results:
                formatted_results.append({
                    "content": doc.page_content,
                    "metadata": doc.metadata,
                    "score": score
                })
            
            return formatted_results
        except Exception as e:
            print(f"Error searching vector store: {str(e)}")
            return []
    
    def get_relevant_context(self, query: str, k: int = 3) -> Optional[str]:
        """
        Get relevant context from the vector store for a given query
        
        Args:
            query (str): The search query
            k (int): Number of results to include in context
            
        Returns:
            Optional[str]: Combined context from relevant documents or None if no results
        """
        results = self.search(query, k=k)
        
        if not results:
            return None
        
        # Combine the results into a single context string
        context_parts = []
        
        for i, result in enumerate(results):
            # Add document with metadata
            metadata_str = ", ".join([f"{key}: {value}" for key, value in result["metadata"].items()])
            context_parts.append(f"Document {i+1} [{metadata_str}]:\n{result['content']}\n")
        
        return "\n".join(context_parts)
    
    def clear_store(self):
        """Clear all documents from the vector store"""
        self.vector_store.delete_collection()
        self.vector_store = Chroma(
            persist_directory=settings.VECTOR_DB_PATH,
            embedding_function=self.embedding_model
        )