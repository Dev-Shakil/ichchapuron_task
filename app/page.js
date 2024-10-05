import { Button } from "@/components/ui/button";
import Post from "@/models/posts";
import connectMongoDB from "./db/mongodb";
import { deletePost } from "./components/actions";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditPost from "./components/EditPost";

export default async function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1; 
  const limit = 12; 
  try {
    await connectMongoDB();
    
    // Count total posts for pagination
    const totalPosts = await Post.countDocuments();
    
    // Fetch paginated posts
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    const totalPages = Math.ceil(totalPosts / limit);
    
    if (posts.length === 0) {
      return <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">No Posts</h1>;
    } else {
      return (
        <div className="w-[60%]  mt-2 mx-auto">
        <div className="overflow-x-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Card key={post._id.toString()} className="shadow-md">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Dialog>
            <DialogTrigger asChild>
                <Button className="font-bold bg-green-600 rounded-lg">Edit</Button>
                </DialogTrigger>
                <EditPost existing={{title:post.title,description:post.description,id:post._id.toString()}} />
            
            </Dialog>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post._id.toString()} />
                    <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
                      Delete
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            ))}
          </div>
          {/* Pagination controls */}
          <div className="gap-3 items-center flex justify-center py-4">
              {/* Previous Button */}
              <Link href={`/?page=${page - 1}`} passHref>
                <Button variant="outline" disabled={page === 1}>
                  Previous
                </Button>
              </Link>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              {/* Next Button */}
              <Link href={`/?page=${page + 1}`} passHref>
                <Button variant="outline" disabled={page === totalPages}>
                  Next
                </Button>
              </Link>
            </div>
        </div>
      </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
