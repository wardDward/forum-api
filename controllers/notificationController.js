import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";

const fetchNotification = asyncHandler(async (req, res) => {
  const authUser = req.user;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7); // Get the date for a week ago

  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1); // Get the date for a month ago

  try {
    const [
      notificationsToday,
      notificationsOneWeekAgo,
      notificationsOneMonthAgo,
    ] = await Promise.all([
      Notification.find({
        sender_id: authUser._id,
      createdAt: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      }),
      Notification.find({
        sender_id: authUser._id,
        createdAt: { $gte: oneWeekAgo, $lt: today },
      }),
      Notification.find({
        sender_id: authUser._id,
        type: "post",
        createAt: { $gte: oneMonthAgo, $lt: today },
      }),
    ]);

    return res.status(200).json({
      notificationsToday,
      notificationsOneWeekAgo,
      notificationsOneMonthAgo,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { fetchNotification };
