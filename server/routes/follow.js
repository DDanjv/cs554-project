const express = require("express");
const User = require("../models/follow");
const router = express.Router();

router
    .post('/createFollow', async (req, res) => {
        try {
            const follow = await User.createFollow(req.body.followerId, req.body.followingId);
            res.send({
                follow,
                followerId: undefined,
                followingId: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .get('/getFollowById', async (req, res) => {
        try {
            const follow = await User.getFollowById(req.body.id);
            res.send({
                follow,
                id: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .delete('/deleteFollow', async (req, res) => {
        try {
            const follow = await User.deleteFollow(req.body.followerId, req.body.followingId);
            res.send({
                follow,
                followerId: undefined,
                followingId: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    });

module.exports = router;