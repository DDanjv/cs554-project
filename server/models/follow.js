const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
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
async function createFollow(followerId, followingId) {
    const newFollow = new Follow({
        followerId,
        followingId
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