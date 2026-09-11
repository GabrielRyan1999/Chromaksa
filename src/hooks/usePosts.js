import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'posts';

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    }, (error) => {
      console.error("Error fetching posts:", error);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async (postData) => {
    try {
      const newPost = {
        ...postData,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, COLLECTION_NAME), newPost);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updatePost = async (id, updatedData) => {
    try {
      const postRef = doc(db, COLLECTION_NAME, id);
      const { id: _, ...dataToUpdate } = updatedData;
      await updateDoc(postRef, dataToUpdate);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return { posts, addPost, updatePost, deletePost };
}
