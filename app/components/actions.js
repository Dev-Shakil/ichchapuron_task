'use server';
import { revalidatePath } from "next/cache";
import connectMongoDB from "../db/mongodb";
import Post from "@/models/posts";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
// Ensure MongoDB is connected
await connectMongoDB();
export const createPosts = async (formData) => {
    

    try {
        // Extract the title and description from formData directly
        const postData = {
            title: formData.title,
            description: formData.description,
        };

        // Create a new post using the Post model
        const newPost = await Post.create(postData);
        await newPost.save(); // Save the newly created post
        
        // Revalidate the homepage path (if you're using ISR in Next.js)
        revalidatePath("/");

        // Return the string representation of the new post
        return newPost.toString();
    } catch (error) {
        console.error('Error creating post:', error);
        return { message: 'Error creating post' };
    }
    
};

  
  export async function editPost(formData, id) {
    try {
        // Extract the title and description from formData directly
        const postData = {
            title: formData.title,
            description: formData.description,
        };
        console
        // Create a new post using the Post model
        const newPost = await Post.findByIdAndUpdate(id, postData);
         // Save the newly created post
        
        // Revalidate the homepage path (if you're using ISR in Next.js)
        revalidatePath("/");

        // Return the string representation of the new post
        return newPost.toString();
    } catch (error) {
        console.error('Error creating post:', error);
        return { message: 'Error creating post' };
    }
  }
export const deletePost = async (formData) => {
    // Extracting todo ID from formData
    const post_id = formData.get("id")
    try {
        // Deleting the todo with the specified ID
        await Post.deleteOne({_id: post_id});
        // Triggering revalidation of the specified path ("/")
        revalidatePath("/");
        toast.success("Deleted Post successfully")
        // Returning a success message after deleting the todo
        return ('Post deleted');
    } catch (error) {
        // Returning an error message if todo deletion fails
        return {message: 'error deleting post'};
    }
};