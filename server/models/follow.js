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
    const follow = await Follow.findById({"followerId": followerId});
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
async function deleteFollow(followerId, followingId) {
    const follow = await getFollowById(followerId);
    if (!follow) {
        throw new Error("Follow not found");
    }
    else{
        follow = await Follow.deleteOne({
            followerId: followerId,
            followingId: followingId
        });
    }
    return follow;
}
//Updates list
async function deleteFollower(id, User) {
    const follow = await getFollowById(id);
    await Follow.updateOne(
        { _id: id },
        { $pull: { followingId: (await getUser(username))._id } }
    );
}
async function addfollower(id, username) {
    const follow =  await getFollowById(id);
    if (!follow) {
        throw new Error("Follow not found");
    }
    await Follow.updateOne(
        { _id: id },
        { $addToSet: { followingId: (await getUser(username))._id } }
    );
    return await getFollowById(id);
}

module.exports = {
    getFollowById,
    getFollowers,
    createFollow,
    addfollower,
    deleteFollow,
    deleteFollower
};