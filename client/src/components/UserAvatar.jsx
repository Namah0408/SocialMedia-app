const UserAvatar = ({ src, size = "w-12 h-12", alt = "Avatar" }) => {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className={`rounded-full object-cover ${size} border border-gray-600`}
    />
  );
};

export default UserAvatar;