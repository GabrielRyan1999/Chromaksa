import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chromaksa_content_calendar';

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse posts from localStorage", e);
      }
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
  };

  const addPost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    savePosts([...posts, newPost]);
  };

  const updatePost = (id, updatedData) => {
    const newPosts = posts.map(p => p.id === id ? { ...p, ...updatedData } : p);
    savePosts(newPosts);
  };

  const deletePost = (id) => {
    savePosts(posts.filter(p => p.id !== id));
  };

  return { posts, addPost, updatePost, deletePost };
}
