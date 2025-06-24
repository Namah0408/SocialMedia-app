import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FollowButton = ({ targetUserId, followers }) => {
  const { token, user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFollowing(followers?.includes(user._id));
    }
  }, [followers, user]);

  const handleFollow = async () => {
    try {
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (isFollowing) {
        await axios.delete(`${import.meta.env.VITE_API}/api/users/${targetUserId}/unfollow`, config);
        setIsFollowing(false);
      } else {
        await axios.post(`${import.meta.env.VITE_API}/api/users/${targetUserId}/follow`, {}, config);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (user?._id === targetUserId) return null; // don't show on your own profile

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded text-sm font-semibold ${
        isFollowing ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;