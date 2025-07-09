import { fetchdata } from "../../main.js";
export async function handleFollowSubmit(followerId, usernameToFollow, setUsernameToFollow) {
    if (!usernameToFollow) {
        alert("Enter a username to follow");
        return;
    }

    try {
        const response = await fetch('/follow/addfollower', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                followerId: followerId,
                usernameToFollow: usernameToFollow.trim()
            })
        });
        const data = await response.json();

        if (data.success) {
            alert(`Now following ${usernameToFollow}`);
            setUsernameToFollow('');
            return data.follow;  
        } else {
            alert(`Failed: ${data.message}`);
            return null;
        }
    } catch (err) {
        alert("Error following user: " + err.message);
        return null;
    }
}
export const handleCreateFollow = async ({ userId }) => {
    try {
        const response = await fetchdata("/follow/createFollow", { id: userId }, "POST");
        if (response.success) {
            return { success: true, follow: response.follow, message: 'Follow document created' };
        }
    } catch (err) {
        console.error("Error creating follow:", err.message);
        throw err;
    }
};
export const handleAddFollow = async ({ id, usernameToFollow }) => {
    try {
        const response = await fetchdata("/follow/addfollower", { id: id, username: usernameToFollow }, "POST");
        if (response.success) {
            return { success: true, follow: response.follow, message: 'add follower' };
        }
    } catch (err) {
        console.error("Error creating follow:", err.message);
        throw err;
    }
};
export const handleGetFollowById = async ({ id }) => {
    try {
        const response = await fetchdata("/follow/getFollowById", { id }, "GET");
        if (response.success) {
            return { success: true, follow: response.follow, message: 'Follow found' };
        }
    } catch (err) {
        console.error("Error getting follow by ID:", err.message);
        throw err;
    }
};
export const handleGetFollowers = async ({ id }) => {
    try {
        const response = await fetchdata("/follow/getFollowers", { id }, "GET");
        console.log(response, "qwerwqwe");
        if (response.success) {
            return { success: true, follow: response.follow, message: 'Followers found' };
        }
    } catch (err) {
        console.error("Error getting followers:", err.message);
        throw err;
    }
};
export const handleDeleteFollow = async ({ followerId }) => {
    try {
        const response = await fetchdata("/follow/deleteFollow", { followerId }, "DELETE");
        if (response.success) {
            return { success: true, result: response.result, message: 'Follow deleted' };
        }
    } catch (err) {
        console.error("Error deleting follow:", err.message);
        throw err;
    }
};
export const handleDeleteFollower = async ({ userId, followerUsername }) => {
    try {
        const response = await fetchdata("/follow/deleteFollower", { id: userId, username: followerUsername }, "DELETE");
        if (response.success) {
            return { success: true, follow: response.follow, message: `Unfollowed ${followerUsername}` };
        }
    } catch (err) {
        console.error("Error deleting follower:", err.message);
        throw err;
    }
};
