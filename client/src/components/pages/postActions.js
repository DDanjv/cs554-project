import { fetchdata } from "../../main.js";

export const handleCreatePost = async ({ title, text, userId }) => {
  if (!title || !text || !userId) {
        return { success: false, message: 'All fields (title, text, userId) are required' };
    }
  try {
    const response = await fetchdata("/post/createPost", { title: title, text: text, userId: userId }, "POST");
    console.log(response.post)
    if (response.success) {
      console.log(response.post)
      return { success: true, post: response.post, message: 'Post created successfully' };
    } 
  } catch (err) {
    console.error("Error creating post:", err.message);
    throw err;
  }
};
export const handleGetPostById = async ({ id }) => {
  try {
    const response = await fetchdata("/post/getPostById", { "id": id }, "GET");
    if (response.success) {
      return { success: true, post: response.post, message: 'Post found' };
    } else {
      throw new Error(response.message || "Failed to fetch post");
    }
  } catch (err) {
    console.error("Error getting post:", err.message);
    throw err;
  }
};

export const handleGetPostByName = async ({ title }) => {
  try {
    const response = await fetchdata("/post/getPostByName", { "title": title }, "GET");
    if (response.success) {
      return { success: true, post: response.post, message: 'Post found' };
    } else {
      throw new Error(response.message || "Failed to fetch post");
    }
  } catch (err) {
    console.error("Error getting post:", err.message);
    throw err;
  }
};
export const handlegetUserAllPosts = async ({ userId }) => {
  try {
    const response = await fetchdata("/post/getPostByName", { "userId": userId }, "GET");
    if (response.success) {
      return { success: true, post: response.post, message: 'allpost' };
    } else {
      throw new Error(response.message || "Failed to fetch post");
    }
  } catch (err) {
    console.error("Error getting post:", err.message);
    throw err;
  }
};

export const handleUpdatePost = async ({ id, title, text }) => {
  try {
    const response = await fetchdata("/post/updatePost", { id: id, title: title, text: text }, "PUT");
    console.log(response)
    if (response.success) {
      return { success: true, post: response, message: 'Post Updated' };
    }
    else {
      throw new Error(response.message || "Failed to update post"); // changed
    }
  } catch (err) {
    console.error("Error updating post:", err.message);
    throw err;
  }
};

export const handleDeletePost = async ({ id }) => {
  try {
    const response = await fetchdata("/post/deletePost", { id: id }, "DELETE");
    if (response.success) {
      return { success: true, message: 'Post delete' };;
    } else {
      throw new Error(response.message || "Failed to delete post");
    }
  } catch (err) {
    console.error("Error deleting post:", err.message);
    throw err;
  }
};