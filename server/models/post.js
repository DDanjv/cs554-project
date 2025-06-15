const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : { type: String, required: true, unique: true },
    text : { type: String, required: true, unique: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes : { type: Int64Array, required: true, unique: true },
});

// create model 
const Post = mongoose.model('Post', postSchema);

// read
async function getPostById(id) {
    const post = await Post.findById({"_id": id});
    if(!post){
        throw new Error("Post not found");
    }
    return post;
}

//create

async function createPost(userId, title, text) {
    const newPost = new Post({
        title, 
        text, 
        userId,
        likes: 0
    });

    if(await Post.findOne({title: title})){
        throw new Error("Post with this title already exists");
    }
    else if(title === null || text === null){
        throw new Error("missing info");

    }
    else{
        await newPost.save();
        return newPost;
    }
}

// edit 
async function editPost(id, title, text) {
    const post = await getPostById(id);
    if(title === null || text === null){
        throw new Error("missing info");

    }
    else{
        post = await Post.updateOne(
        { _id: id },
        { $set: { title, text } }
        );
    }
    return await getPostById(id);

}
// delete
async function deletePost(id) {
    const post = await getPostById(id);
    await Post.deleteOne({"_id": post._id});
    return "Post deleted successfully";
}
