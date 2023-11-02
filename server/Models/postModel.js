import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true }, // id de celui qui post 
    desc: { type: String, required: true },
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
    // video: String, 
    comments: { // pour les commentaires ont fait un sous base de donnée
      type: [
        {
          commenterId:String,
          // commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,// true pour que le tableau soit créé de base 
    },
  },
  {
    timestamps: true,
  }
);

let PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
