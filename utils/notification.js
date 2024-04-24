import Notification from "../models/notificationModel";

const addNotification = async (req, res) => {
  const notification = await Notification.create({
    user_id: authUser._id,
    about: `${post.title} your post has been published.`,
  });
};

export { addNotification };
