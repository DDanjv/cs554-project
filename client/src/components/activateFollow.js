
import { fetchdata } from "../main";


const activateFollow = async (user) => { 
    console.log("User ID:", user?._id);
    try {
        if (!user) {
            alert("ID not available.");
            return;
        }
        const response = await fetchdata('/follow/createFollow', { followerId: user?._id }, 'POST');

        if (response.success) {
            alert("created successfully!");
            window.location.reload();
        }
    } catch (error) {
        console.error("Error activating follow :", error.message);
        alert(`Failed to activate try again: ${error.message}`);
    }
}

export { activateFollow };
