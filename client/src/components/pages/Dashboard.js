import React, { useState } from 'react';
import { useUserGlobal } from '../../UserGlobal.js';
import FollowList from '../followlist.js';
import { activateFollow } from '../activateFollow.js'; 
import { handleFollowSubmit } from './followActions.js';
import {
    handleCreatePost,
    handlegetPostById,
    handleUpdatePost,
    handleDeletePost
} from './postActions.js';


const Dashboard = () => {
    const { user, logout } = useUserGlobal();

    // Follow state
    const [usernameToFollow, setUsernameToFollow] = useState('');

    // Post form states
    const [postId, setPostId] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    // Follow submit
    async function onFollowSubmit(e) {
        e.preventDefault();
        await handleFollowSubmit(user._id, usernameToFollow, setUsernameToFollow);
    }

    // Handlers for post actions
    const onCreatePost = async () => {
        try {
            const post = await handleCreatePost({ title: postTitle, text: postText, userId: user._id });
            setResponseMessage(JSON.stringify(post, null, 2));
        } catch (err) {
            setResponseMessage(err.message);
        }
    };

    const onGetPostById = async () => {
        try {
            const post = await handlegetPostById({ id: postId });
            setResponseMessage(JSON.stringify(post, null, 2));
        } catch (err) {
            setResponseMessage(err.message);
        }
    };

    const onUpdatePost = async () => {
        try {
            const post = await handleUpdatePost({ id: postId, title: postTitle, text: postText });
            setResponseMessage(JSON.stringify(post, null, 2));
        } catch (err) {
            setResponseMessage(err.message);
        }
    };

    const onDeletePost = async () => {
        try {
            const result = await handleDeletePost({ id: postId });
            setResponseMessage(result);
        } catch (err) {
            setResponseMessage(err.message);
        }
    };

    return (
        <div>
            <div className="grid-container">
                <h1>Dashboard</h1>
                <h1>Welcome {user?.username || "Guest"}!</h1>
                <button className="objdef" onClick={logout}>Log out</button>
            </div>

            <div className="grid-container">
                <div className="objdef">
                    <h2>Post Management</h2>

                    <div className="objdef">
                        <input
                            className="objdef"
                            type="text"
                            placeholder="Post ID"
                            value={postId}
                            onChange={e => setPostId(e.target.value)}
                        />
                    </div>
                    <div className="objdef">
                        <input
                            className="objdef"
                            type="text"
                            placeholder="Post Title"
                            value={postTitle}
                            onChange={e => setPostTitle(e.target.value)}
                        />
                    </div>
                    <div className="objdef"> 
                        <textarea
                            className="objdef"
                            placeholder="Post Text"
                            value={postText}
                            onChange={e => setPostText(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="objdef">
                        <button className = "objdef" onClick={onCreatePost}>Create Post</button>
                        <button className = "objdef"  onClick={onGetPostById}>Get Post by ID</button>
                        <button className = "objdef" onClick={onUpdatePost}>Update Post</button>
                        <button  className = "objdef" WonClick={onDeletePost}>Delete Post</button>
                    </div>

                    <h3>Response</h3>
                    <textarea
                        className="objdef"
                        value={responseMessage}
                        readOnly
                        style={{ width: '90%' , height: '500px'}}
                    />
                </div>

                <div className="objdef">
                    <h2>Following</h2>
                    <button className="objdef" onClick={() => activateFollow(user)}>Activate Follow permission</button>
                    <div className="objdef">
                        <p>Follow a user</p>
                        <form onSubmit={onFollowSubmit}>
                            <input
                                className="objdef"
                                type="text"
                                placeholder="Enter username"
                                value={usernameToFollow}
                                onChange={e => setUsernameToFollow(e.target.value)}
                            />
                            <button type="submit">Follow</button>
                        </form>
                    </div>
                    <p>Follow list</p>
                    <FollowList user={user} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;