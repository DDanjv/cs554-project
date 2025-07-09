const express = require("express");
const Follow = require("../models/follow");
const router = express.Router();

router
    .post('/createFollow', async (req, res) => {
        try {
            const follow = await Follow.createFollow(req.body.id);
            res.send({
                follow,
                followiderId: undefined
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
                id: undefined,
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .delete('/deleteFollow', async (req, res) => {
        try {
            const follow = await Follow.deleteFollow(req.query.followerId);
            res.send({
                message: "Follow deleted",
                result: follow
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .delete('/deleteFollower', async (req, res) => {
        try {
            const follow = await Follow.deleteFollower(req.query.id, req.query.username);
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
    });

module.exports = router;

