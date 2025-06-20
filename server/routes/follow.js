const express = require("express");
const Follow = require("../models/follow");
const router = express.Router();

router
    .post('/createFollow', async (req, res) => {
        try {
            const follow = await Follow.createFollow(req.body.followerId);
            res.send({
                follow,
                followerId: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .post('/addfollower', async (req, res) => {
        try {
            const follow = await Follow.addfollower(req.body.id, req.body.username);
            res.send({
                follow,
                id: undefined,
                username: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .get('/getFollowById', async (req, res) => {
        try {
            const follow = await Follow.getFollowById(req.body.id);
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
            const follow = await Follow.deleteFollow(req.body.followerId, req.body.followingId);
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
    .delete('/deleteFollower', async (req, res) => {
        try {
            const follow = await Follow.deleteFollower(req.body.id, req.body.User);
            res.send({
                follow,
                id: undefined,
                User: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    });

module.exports = router;

