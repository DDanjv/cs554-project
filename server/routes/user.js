const express = require("express");
const User = require("../models/user");
const router = express.Router();

router
    .post('/login', async (req, res) => {
        try{
            const user = await User.login(req.body.username, req.body.password);
            res.send({
                user,
                password: undefined,
            })
        } catch (error){
            res.status(401).send({
                message: error.message
            })

        }
    })
    .post('/register', async (req, res) => {
        try{
            const user = await User.register(req.body.username, req.body.email, req.body.password);
            res.send({
                user,
                username: undefined,
                email: undefined,
                password: undefined

            })
        }
        catch (error){
            res.status(401).send({
                message: error.message
            })
        }
    })
    .put('/UpdatePassword', async (req, res) => {
        try {
            const user = await User.UpdatePassword(req.body.id, req.body.password);
            res.send({
                user,
                id: undefined,
                password: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .put('/UpdateEmail', async (req, res) => {
        try {
            const user = await User.UpdateEmail(req.body.id, req.body.email);
            res.send({
                user,
                id: undefined,
                email: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .put('/UpdateUserName', async (req, res) => {
        try {
            const user = await User.UpdateUserName(req.body.id, req.body.username);
            res.send({
                user,
                id: undefined,
                username: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .delete('/DeleteUser', async (req, res) => {
        try {
            const user = await User.DeleteUser(req.body.id)
            res.send({
                user,
                id: undefined
            });
        }
        catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    })
    .get('/GetUserById', async (req, res) => {
        try {
            const user = await User.GetUserById(req.body.id);
            res.send({
                user,
                id: undefined
            });
        } catch (error) {
            res.status(401).send({
                message: error.message
            });
        }
    });
    
module.exports = router;