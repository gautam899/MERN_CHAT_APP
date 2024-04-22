import mongoose from "mongoose";
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model("Chat", chatModel);
export default Chat;

// Now we need structure each and every chat
//The chat will contain some of the following information
// chatname
// isGroupChat
// users
// latestMessage
// groupAdmin if it is a group chat
// We are going to use mongoose to connect to the database and make queries.

