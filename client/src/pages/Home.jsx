import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, token, setUser, logout, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !token)) {
      navigate("/login");
    }
  }, [user, token, loading, navigate]);  // ✅ Check loading too

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/api/posts/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load feed", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const handlePostCreated = () => fetchPosts();
  const handlePostDeleted = (postId) =>
    setPosts((prev) => prev.filter((p) => p._id !== postId));

  if (loading) return <div className="text-white text-center p-8">Loading...</div>;  // ✅ Add loader

  return (
    <div className="min-w-screen bg-gray-900">
      <div className="min-h-screen bg-gray-900 text-white p-6 max-w-2xl mx-auto">
        <CreatePost onPostCreated={handlePostCreated} />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handlePostDeleted} />
        ))}
      </div>
    </div>
  );
};

export default Home;