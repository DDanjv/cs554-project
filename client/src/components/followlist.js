import { useEffect, useState } from "react";
import { fetchdata } from "../main";

const FollowList = ({ user }) => {
    const [followList, setFollowList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
    const fetchFollowList = async () => {
        if (!user?._id) {
            setError("User ID is not available");
            return;
        }

        try {
            const response = await fetchdata('/follow/getFollowers', { id: user._id }, 'GET');
            console.log("Follow list response:", response);

            if (response?.success) {
                const followIds = response.follow.followingId || [];
                const convertedList = [];

                for (let i = 0; i < followIds.length; i++) {
                    const id = followIds[i];
                    try {
                        const person = await fetchdata('/user/GetUserById', { id }, 'GET');
                        if (person?.success) {
                            convertedList.push(person.user);
                        }
                    } catch (err) {
                        console.error(`Failed to fetch user with ID ${id}:`, err.message);
                    }
                }

                setFollowList(convertedList);
                console.log("Converted follow list:", convertedList);
            }
        } catch (err) {
            console.error("Error fetching follow list:", err.message);
            setError("Failed to load follow list: " + err.message);
        }
    };

    fetchFollowList();
    }, [user]);
    /*useEffect(() => {
        const fetchFollowList = async () => {
            if (!user?._id) {
                setError("User ID is not available");
                return;
            }
            try {
                const response = await fetchdata('/follow/getFollowers', { id: user?._id }, 'GET');
                if (response?.success) {
                    setFollowList(response.follow.followingId || []);
                }
            } catch (err) {
                console.error("Error fetching follow list:", err.message);
                setError("Failed to load follow list: " + err.message);
            }
        };

        fetchFollowList();
    }, [user]);*/

    if (error) {
        return <div className="objdef">{error}</div>;
    }

    return (
        <div className="objdef">
            <ul>
                {followList.length > 0 ? (
                    followList.map((id) => (
                        <li key={id}>{id}</li>
                    ))
                ) : (
                    <li>No users followed yet {followList} e </li>
                )}
            </ul>
        </div>
    );
};

export default FollowList;
