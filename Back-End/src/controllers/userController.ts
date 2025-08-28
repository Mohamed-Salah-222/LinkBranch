import User from "../models/User.js";
import Link from "../models/Link.js";

import { type ExpressHandler } from "../types.js";

//*-----------------------------------------------------------------------------------Get a user Page-------------------------------------------------------------------------------------
export const getPublicProfile: ExpressHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("displayName bio appearance profileImageUrl");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const links = await Link.find({ owner: user._id, isActive: true }).sort({
      order: "asc",
    });
    res.status(200).json({
      profile: user,
      links: links,
    });
  } catch (error) {
    next(error);
  }
};
//*------------------------------------------------------------------------------Update Profile Appearance--------------------------------------------------------------------------------
export const updateMyAppearance: ExpressHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { appearance } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (appearance) {
      user.appearance = { ...user.appearance, ...appearance };
    }
    const updatedUser = await user.save();

    res.status(200).json(updatedUser.appearance);
  } catch (error) {
    next(error);
  }
};
