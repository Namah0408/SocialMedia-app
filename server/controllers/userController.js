import User from "../models/User.js";

// GET /api/users/:id
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "name avatar")
      .populate("following", "name avatar");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// POST /api/users/:id/follow
export const followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    targetUser.followers.push(currentUserId);
    currentUser.following.push(targetUserId);

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "User followed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Follow failed", error: err.message });
  }
};

// DELETE /api/users/:id/unfollow
export const unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    targetUser.followers = targetUser.followers.filter(
      (followerId) => followerId.toString() !== currentUserId
    );

    currentUser.following = currentUser.following.filter(
      (followingId) => followingId.toString() !== targetUserId
    );

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unfollow failed", error: err.message });
  }
};