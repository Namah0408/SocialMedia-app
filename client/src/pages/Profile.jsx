import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserAvatar from "../components/UserAvatar";
import FollowButton from "../components/FollowButton";
import UserCard from "../components/UserCard";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleAvatarChange = async (file) => {
    const previewUrl = URL.createObjectURL(file);
    setPreviewAvatar(previewUrl); // Show preview immediately

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API}/api/users/${id}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProfile(); // Refresh profile after upload
    } catch (err) {
      console.error("Failed to upload avatar", err);
    }
  };

  if (!profile) return <div className="text-white p-4">Loading...</div>;

  const isOwnProfile = id === JSON.parse(atob(localStorage.getItem("token").split(".")[1]))?.id;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <UserAvatar
              src={previewAvatar || profile.avatar}
              size="w-20 h-20"
              onChange={isOwnProfile ? handleAvatarChange : null}
            />
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-400">{profile.email}</p>
            </div>
          </div>
          {!isOwnProfile && (
            <FollowButton
              targetUserId={profile._id}
              followers={profile.followers?.map((u) => u._id)}
            />
          )}
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
      </div>
    </div>
  );
};

export default Profile;