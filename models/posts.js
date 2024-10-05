import mongoose, {Schema} from "mongoose";


const PostSchema = new Schema(
    {
        title:String,
        description:String
    },
    {
        timestamps:true,
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;