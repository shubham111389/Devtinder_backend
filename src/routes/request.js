const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      console.log("🔹 Request received with:");
      console.log("From User ID:", fromUserId);
      console.log("To User ID:", toUserId);
      console.log("Status:", status);

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        console.error("❌ Invalid status type:", status);
        return res.status(400).json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        console.error("❌ Target user not found:", toUserId);
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        console.warn("⚠️ Connection Request Already Exists!!");
        return res.status(400).send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      console.log("✅ Connection Request Saved:", data);

      // Prepare email subject and body
      const subject = "A new friend request from " + req.user.firstName;
      const body = req.user.firstName + " is " + status + " in " + toUser.firstName;

      console.log("📧 Sending email with subject:", subject);
      console.log("📧 Email body:", body);

      const emailRes = await sendEmail.run(subject, body);
      console.log("📨 Email Response:", emailRes);

      res.json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });

    } catch (err) {
      console.error("❗ Error occurred:", err);
      console.error("🔍 Stack Trace:", err.stack);
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;