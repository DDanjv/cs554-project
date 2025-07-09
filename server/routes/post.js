const express = require("express");
const User = require("../models/post");
const router = express.Router();

router
    .post('/createPost', async (req, res) => {
            try{
                const post = await User.createPost(req.body.title, req.body.text, req.body.userId);
                res.send({
                    post,
                    success: true,
                    title: undefined,
                    text: undefined,
                    userId: undefined
                })
            } catch (error){
                res.status(401).send({
                    success: false,
                    message: error.message
                })

            }
        })
    .get('/getPostById', async (req, res) => {
            try{
                const post = await User.getPostById(req.query.id);
                res.send({
                    success: true,
                    post,
                    id: undefined
                })
            } catch (error){
                res.status(401).send({
                    success: false,
                    message: error.message
                })

            }
        })
    .get('/getPostByName', async (req, res) => {
            try{
                const post = await User.getPostByName(req.query.title);
                res.send({
                    success: true,
                    post,
                    id: undefined
                })
            } catch (error){
                res.status(401).send({
                    success: false,
                    message: error.message
                })

            }
        })
    .get('/getUserAllPosts', async (req, res) => {
            try{
                const posts = await User.getUserAllPosts(req.query.userId);
                res.send({
                    success: true,
                    posts,
                    id: undefined
                })
            } catch (error){
                res.status(401).send({
                    success: false,
                    message: error.message
                })

            }
        })
    .put('/updatePost', async (req, res) => {
            try{
                let post = await User.updatePost(req.body.id, req.body.title, req.body.text);
                res.send({
                    success: true,
                    post,
                    id: undefined,
                    title: undefined,
                    text: undefined

                })
                console.log(res)
            } catch (error){
                res.status(401).send({
                    success: false,
                    message: error.message
                })

            }
        })
        .delete('/deletePost', async (req, res) => {
            try{
                const post = await User.deletePost(req.query.id);
                res.send({
                    success: true,
                    post,
                    id: undefined
                })
            } catch (error){
                res.status(401).send({
                    success: false,
                    message: error.message
                })

            }
        });

module.exports = router;