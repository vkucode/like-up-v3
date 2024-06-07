import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    name_roue: {
      type: String,
      required: true,
    },
    localisation: {
      type: String,
      required: true,
    },
    db_name_client: {
      type: String,
      required: true,
    },
    gifts: {
      type: Array,
      required: true,
    },
    points: {
      type: Array,
      required: true,
    },
    social_media: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = models.roues || model("roues", postSchema);

export default PostModel;
