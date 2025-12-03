import mongoose, { Schema} from "mongoose";



const FavoriteSchema= new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Product",
      unique:true
    },

  },
  { timestamps: { createdAt: true, updatedAt: false } }
);



export default mongoose.models.Favorite ||
  mongoose.model("Favorite", FavoriteSchema);
