import mongoose, { Document, Schema } from "mongoose";
export interface IBlog extends Document {
  title: string;
  body: string;
}
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export default mongoose.model<IBlog>("Blogs", BlogSchema);
