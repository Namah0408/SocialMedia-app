import React, { useRef } from "react";

const UserAvatar = ({ src, size = "w-12 h-12", alt = "Avatar", onChange }) => {
  const fileInputRef = useRef();

  const handleAvatarClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onChange) {
      onChange(file); // Pass the file to the parent component
    }
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={handleAvatarClick}>
      <img
        src={src || "/default-avatar.png"}
        alt={alt}
        className={`rounded-full object-cover ${size} border border-gray-600`}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UserAvatar;