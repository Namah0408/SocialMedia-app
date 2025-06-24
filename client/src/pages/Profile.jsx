import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserAvatar from "../components/UserAvatar";
import FollowButton from "../components/FollowButton";
import UserCard from "../components/UserCard";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/users/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <UserAvatar src={profile.avatar} size="w-20 h-20" />
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-400">{profile.email}</p>
            </div>
          </div>
          <FollowButton targetUserId={profile._id} followers={profile.followers?.map(u => u._id)} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="font-semibold mb-2">Followers</h3>
            <div className="space-y-2">
              {profile.followers?.map((f) => (
                <UserCard key={f._id} user={f} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Following</h3>
            <div className="space-y-2">
              {profile.following?.map((f) => (
                <UserCard key={f._id} user={f} />
              ))}
            </div>
          </div>
        </div>

        {/* User Posts Section – to be implemented later */}
        {/* Example: <UserPosts userId={profile._id} /> */}
      </div>
    </div>
  );
};

export default Profile;