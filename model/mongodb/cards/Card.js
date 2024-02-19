import mongoose from "mongoose";
import Image from "./Image.js";
import Address from "../users/Address.js";
import phoneRegex from "../../../utils/phoneRegex.js";

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 1024,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(phoneRegex),
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
  },
  web: {
    type: String,
    minLength: 14,
  },
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    unique: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
const Card = mongoose.model("card", CardSchema);
export default Card;
