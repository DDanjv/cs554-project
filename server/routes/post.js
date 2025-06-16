const express = require("express");
const User = require("../models/post");
const router = express.Router();

router
    .post('/createPost', async (req, res) => {
            try{
                const post = await User.createPost(req.body.title, req.body.content);
                res.send({
                    post,
                    title: undefined,
                    content: undefined
                })
            } catch (error){
                res.status(401).send({
                    message: error.message
                })

            }
        })
    .get('/getPostById', async (req, res) => {
            try{
                const post = await User.getPostById(req.body.id);
                res.send({
                    post,
                    id: undefined
                })
            } catch (error){
                res.status(401).send({
                    message: error.message
                })

            }
        })
    .put('/updatePost', async (req, res) => {
            try{
                const post = await User.updatePost(req.body.id, req.body.title, req.body.content);
                res.send({
                    post,
                    id: undefined,
                    title: undefined,
                    content: undefined
                })
            } catch (error){
                res.status(401).send({
                    message: error.message
                })

            }
        })
        .delete('/deletePost', async (req, res) => {
            try{
                const post = await User.deletePost(req.body.id);
                res.send({
                    post,
                    id: undefined
                })
            } catch (error){
                res.status(401).send({
                    message: error.message
                })

            }
        });

module.exports = router;