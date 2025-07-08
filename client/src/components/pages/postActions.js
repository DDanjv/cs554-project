import { useState } from 'react';
import { useUserGlobal } from '../../UserGlobal.js';
import { fetchdata } from "../../main.js";

 export const handleCreatePost = async ({ title, text, userId }) => {
    try {
        const response = await fetchdata(`/post/createPost`, { title, text, userId }, 'POST');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.post;
    } catch (err) {
        console.error("Error creating post:", err.message);
        throw err;
    }
};

export const handlegetPostById = async ({ id }) => {
    try {
        const response = await fetchdata(`/post/getPostById`, { id }, 'GET');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.post;
    } catch (err) {
        console.error("Error getting post:", err.message);
        throw err;
    }
};

export const handleUpdatePost = async ({ id, title, text }) => {
    try {
        const response = await fetchdata(`/post/updatePost`, { id, title, text }, 'PUT');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.post;
    } catch (err) {
        console.error("Error updating post:", err.message);
        throw err;
    }
};

export const handleDeletePost = async ({ id }) => {
    try {
        const response = await fetchdata(`/post/deletePost`, { id }, 'DELETE');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.post;
    } catch (err) {
        console.error("Error deleting post:", err.message);
        throw err;
    }
};