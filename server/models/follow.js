const mongoose = require('mongoose');
const {getUser} = require('./user.js');
const followSchema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followingId: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true }
});

//create model 

const Follow = mongoose.model('Follow', followSchema)

//read
async function getFollowById(id) {
    const follow = await Follow.findById({"_id": id});
    return follow;
}
async function getFollowers(followerId) {
    const follow = await Follow.findOne({"followerId": followerId});
    return follow;
}

//create
async function createFollow(id) {
    const existingFollow = await Follow.findOne({
        followerId: id
    });
    if (existingFollow) {
        return existingFollow;
    }
    const newFollow = new Follow({
        followerId: id,
        followingId: []
    });

    await newFollow.save();
    return newFollow;
}
//delete
async function deleteFollow(followerId) {
    const follow = await getFollowers(followerId);
    if (!follow) throw new Error("Follow not found");
    const deleted = await Follow.deleteOne({ _id: follow._id });
    return deleted;
}
//Updates list
async function deleteFollower(id, username) {
    const follow =  await getFollowById(id);
    if (!follow) {
        throw new Error("Follow not found");
    }
    await Follow.updateOne(
        { _id: id },
        { $pull: { followingId: (await getUser(username))._id } }
    );
    return await getFollowById(id);
}
async function addfollower(followerId, username) {
    const follow = await Follow.findOne({ followerId });
    if (!follow){
        throw new Error("Follow not found");
    }
    const userToFollow = await getUser(username);
    await Follow.updateOne({ 
        _id: follow._id }, 
        { $addToSet: { followingId: userToFollow._id } 
    });
    return await Follow.findById(follow._id);
}

module.exports = {
    getFollowById,
    getFollowers,
    createFollow,
    addfollower,
    deleteFollow,
    deleteFollower
};