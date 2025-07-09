import React, { useState } from 'react';
import { useUserGlobal } from '../../UserGlobal.js';
import { handleCreatePost, handleGetPostById, handleUpdatePost, handleDeletePost, handleGetPostByName, handlegetUserAllPosts } from './postActions.js';
import { handleFollowSubmit, handleCreateFollow, handleAddFollow, handleGetFollowById, handleGetFollowers, handleDeleteFollow, handleDeleteFollower} from './followActions.js';
const Dashboard = () => {
    const { user, logout } = useUserGlobal();

    // Follow state
    const [usernameToFollow, setUsernameToFollow] = useState('');
    const [userFollows, setUserFollows] = useState([]);
    const [followId, setFollowId] = useState('');
    // Post form states
    const [postId, setPostId] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [userPosts, setUserPosts] = useState([]); 

    // Follow submit
    async function onFollowSubmit(e) {
        e.preventDefault();
        await handleFollowSubmit(user._id, usernameToFollow, setUsernameToFollow);
    }

    // Handlers for post actions
    const onCreatePost = async () => {
        try {
            const response = await handleCreatePost({ title: postTitle, text: postText, userId: user._id });
            console.log(response);
            if (response.success && response.post) {
                const { title, text, _id } = response.post;
                setResponseMessage(JSON.stringify({ title, text, _id }, null, 2));
            }
        } catch (err) {
            setResponseMessage(err.message);
        }
    };

    const onGetPostById = async () => {
        try {
            const response = await handleGetPostById({ id: postId });
            console.log(response);
            if (response.success && response.post) {
                const { title, text, _id } = response.post;
                setResponseMessage(JSON.stringify({title, text, _id }, null, 2));
            }
        } catch (err) {
            setResponseMessage(err.message);
        }
    };
    const onGetPostByName = async () => {
        try {
            const response = await handleGetPostByName({ title: postTitle });
            console.log(response);
            if (response.success && response.post) {
                const { title, text, _id } = response.post;
                setResponseMessage(JSON.stringify({title, text, _id }, null, 2));
            }
        } catch (err) {
            setResponseMessage(err.message);
        }
    };
    const ongetUserAllPosts = async () => {
        try {
            const response = await handlegetUserAllPosts({ userId: user._id  });
            console.log(response);
            if (response.success && response.posts) {
                setUserPosts(response.posts);
                setResponseMessage("Posts loaded successfully");
            }
        } catch (err) {
            setResponseMessage(err.message);
        }
    };
    
    let onUpdatePost = async () => {
        try {
            let response = await handleUpdatePost({ id: postId, title: postTitle, text: postText });
            if (response.success && response.post) {
                setResponseMessage(JSON.stringify(response.message, null, 2));
            }else {
                setResponseMessage(response.message || "Update failed"); // changed
            }
        } catch (err) {
            setResponseMessage(err.message);
        }
    };

    const onDeletePost = async () => {
        try {
            const result = await handleDeletePost({ id: postId });
            if(result.success){
                setResponseMessage("delete");
            }
        } catch (err) {
            setResponseMessage(err.message);
        }
    };
    const onCreateFollow = async () => {
        try {
            const response = await handleCreateFollow({ userId: user._id });
            
            setResponseMessage(JSON.stringify(response, null, 2));
        } catch (error) {
            setResponseMessage(error.message);
        }
    };
    const onAddFollow = async () => {
        try {
            console.log(usernameToFollow);
            const response = await handleAddFollow({ id: user._id , usernameToFollow });
            setResponseMessage(JSON.stringify(response, null, 2));
        } catch (error) {
            setResponseMessage(error.message);
        }
    };
    const onGetFollowerId = async () => {
        try {
            const response = await handleGetFollowers({ id: user._id });
            console.log(response);
            return JSON.stringify(response, null, 2);
        } catch (error) {
            console.log(error)
        }
    };
    const onCreateDeleteFollow = async () => {
        try {
            const response = await handleDeleteFollow({ userId: user._id, usernameToUnfollow: usernameToFollow });
            setResponseMessage(JSON.stringify(response, null, 2));
        } catch (error) {
            setResponseMessage(error.message);
        }
    };
    const onCreateDeleteFollower = async () => {
        try {
            const response = await handleDeleteFollower({ userId: user._id, followerUsername: usernameToFollow });
            setResponseMessage(JSON.stringify(response, null, 2));
        } catch (error) {
            setResponseMessage(error.message);
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
                        <button  className = "objdef" onClick={onDeletePost}>Delete Post</button>
                        <button  className = "objdef" onClick={onGetPostByName}>Get Post by Name</button>
                    </div>

                    <h3>Response</h3>
                    <textarea
                        className="objdef"
                        value={responseMessage}
                        readOnly
                        style={{ width: '90%' , height: '500px'}}
                    />
                </div>
                <div className='objdef'>
                    <h2>Your Posts</h2>
                    <button className="objdef" onClick={ongetUserAllPosts}>Refresh My Posts</button>
                    <div className='objdef' style={{ maxHeight: '400px', overflow: 'auto' }}>
                        {userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <div key={post._id} style={{padding: '10px', margin: '10px 0', maxWidth: "500px" }}>
                                    <h4>{post.title}</h4>
                                    <p>{post.text}</p>
                                    <small>ID: {post._id}</small>
                                </div>
                            ))
                        ) : (
                            <p>No posts found for this user.</p>
                        )}
                    </div>
                </div>
                <div className="objdef">
                    <h2>Follow Management</h2>

                    <input
                        className="objdef"
                        type="text"
                        placeholder="Username to follow/unfollow"
                        value={usernameToFollow}
                        onChange={e => setUsernameToFollow(e.target.value)}
                    />

                    <div className="objdef">
                        <button className="objdef" onClick={onCreateFollow}>Create Follow</button>
                        <button className="objdef" onClick={onAddFollow}>Add Follower</button>
                        <button className="objdef" onClick={onCreateDeleteFollower}>Delete Follower</button>
                        <button className="objdef" onClick={onCreateDeleteFollow}>Delete Follow</button>
                        <button className="objdef" onClick={onGetFollowerId}>Refresh Follows</button>
                    </div>

                    <h3>Response</h3>
                    <textarea
                        className="objdef"
                        value={responseMessage}
                        readOnly
                        style={{ width: '90%', height: '200px' }}
                    />
                </div>
                <div className='objdef'>
                    <h2>Your Follows</h2>
                    <div className='objdef' style={{ maxHeight: '400px', overflow: 'auto' }}>
                        {userFollows.length > 0 ? (
                            userFollows.map((follow, index) => (
                                <div key={index} style={{ padding: '10px', margin: '10px 0', maxWidth: "500px" }}>
                                    <p>{follow.username || follow}</p>
                                </div>
                            ))
                        ) : (
                            <p>No follows found for this user.</p>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;