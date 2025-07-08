import { fetchdata } from "../main";
const addfollower = async (username) =>{
    if(!username){
        alert("username is required");
        return;
    }
    try{ 
        const response = await fetchdata('/follow/addfollower', {username: username}, 'POST');
        if(response.success){
            alert("added following list successfully");
            window.location.reload();
        }
        else{
            alert("failed to add to the following list");
        }
    } catch (error){
        console.error("error adding to following list", error.message);
        alert(error.message);
    }
}

export { addfollowwer}