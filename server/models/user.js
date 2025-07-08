const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//create model 
const User = mongoose.model('User', userSchema);

//read
async function login(username, password){
    const user = await getUser(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw Error('Wrong Password');
    }
    return user._doc;
}

//get functions
async function getUser(username) {
    const user = await User.findOne({"username": username});
    if(!user){
        throw new Error("User not found");
    }
    return user;
}
async function GetUserById(id) {
    const user = await User.findById({"_id": id});
    if(!user){
        throw new Error("User not found");
    }
    return user;
}
async function getNameById(id) {
    const user = await User.findById({"_id": id});
    if(!user){
        throw new Error("User not found");
    }
    return user.name;
}

//create
async function register(username, email, password){
    const user = await User.findOne({"username": username});
    if(user){
        throw new Error("Username already exists");
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashed
        });
        await newUser.save();
        return newUser;
    }
}
//update

async function UpdatePassword(id, newPassword) {
    const user = await GetUserById(id);

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
        throw new Error("New password cannot be the same as the old password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ _id: id }, { $set: { password: hashed } });
    return "Password updated successfully";
}

async function UpdateEmail(id, email) {
    const user = await GetUserById(id);
    if (await User.findOne({"email": email})) {
        throw new Error("Email already exists");
    }
    else if(user.email === email){
        throw new Error("Email already named this");
    }else{
        await User.updateOne({"_id": id}, { $set: { email: email } });
    }
}
async function UpdateUserName(id, username) {
    const user = await GetUserById(id);
    if(await User.findOne({"username": username})){
        throw new Error("Username already exists");
    }
    else if(user.name === username){
        throw new Error("Username already named this");
    }
    else{
        await User.updateOne({"_id": id}, { $set: { username: username } });
    }
    return user
}

//delete

async function DeleteUser(id) {
    const user = await GetUserById(id);
    await User.deleteOne({"_id": id});
    return "User deleted successfully";
}

module.exports = {
    User,
    login,
    register,
    getUser,
    GetUserById,
    getNameById,
    UpdatePassword,
    UpdateEmail,
    UpdateUserName,
    DeleteUser
};