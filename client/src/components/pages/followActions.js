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