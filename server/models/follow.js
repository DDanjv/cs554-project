const mongoose = require('mongoose');
const { getUser } = require('./user.js');

// Schema
const followSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followingId: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true }
});

// Create model
const Follow = mongoose.model('Follow', followSchema);

// Read
async function getFollowById(id) {
    const existingFollow = await Follow.findById(id);
    if (!existingFollow) {
        throw new Error("Follow not found");
    }
    return existingFollow;
}

// Create 
async function createFollow(followerId) {
    const existingFollow = await Follow.findById(followerId);
    if (existingFollow) {
        return existingFollow;
    }
    const newFollow = new Follow({
        _id: followerId,
        followingId: []
    });

    await newFollow.save();
    return newFollow;
}

// Delete 
async function deleteFollow(followerId) {
    const follow = await Follow.findById(followerId);
    if (!follow) throw new Error("Follow not found");
    const deleted = await Follow.deleteOne({ _id: followerId });
    return deleted;
}

// Get 
async function getFollowers(followerId) {
    const follow = await Follow.findById(followerId);
    if (!follow) {
        throw new Error("Follow not found for this user");
    }
    return follow.followingId;
}

// Remove 
async function deleteFollower(followerId, username) {
    const follow = await getFollowById(followerId);
    if (!follow) {
        throw new Error("Follow not found");
    }
    const userToRemove = await getUser(username);
    await Follow.updateOne(
        { _id: followerId },
        { $pull: { followingId: userToRemove._id } }
    );
    return await getFollowById(followerId);
}

// Add 
async function addfollower(followerId, username) {
    const follow = await Follow.findById(followerId);
    if (!follow) {
        throw new Error("Follow not found");
    }
    const userToFollow = await getUser(username);
    await Follow.updateOne(
        { _id: followerId },
        { $addToSet: { followingId: userToFollow._id } }
    );
    return await Follow.findById(followerId);
}

module.exports = {
    getFollowById,
    getFollowers,
    createFollow,
    addfollower,
    deleteFollow,
    deleteFollower
};