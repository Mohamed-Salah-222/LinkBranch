import User from "../models/User.js";
import Link from "../models/Link.js";
import { type ExpressHandler } from "../types.js";

//*--------------------------------------------------------------------------------------Creat A Link--------------------------------------------------------------------------------------
export const createLink: ExpressHandler = async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).json({ message: "Please Provide both the title and the url" });
      return;
    }
    const user = req.user?.id;

    const linkCount = await Link.countDocuments({ owner: user });

    const link = new Link({
      owner: user,
      title,
      url,
      order: linkCount,
    });

    await link.save();
    res.status(201).json(link);
  } catch (error) {
    next(error);
  }
};
//*--------------------------------------------------------------------------------------Get My Links--------------------------------------------------------------------------------------
export const getMyLinks: ExpressHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const links = await Link.find({ owner: userId }).sort({ order: "asc" });
    res.status(200).json(links);
  } catch (error) {
    next(error);
  }
};
//*--------------------------------------------------------------------------------------Update a link--------------------------------------------------------------------------------------
export const updateLink: ExpressHandler = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const { title, url } = req.body;
    const userId = req.user?.id;
    const link = await Link.findOne({ _id: linkId, owner: userId });

    if (!link) {
      res.status(404).json({ message: "Link not found or you do not have permission to edit it." });
      return;
    }

    if (title) {
      link.title = title;
    }
    if (url) {
      link.url = url;
    }

    const updatedLink = await link.save();

    res.status(200).json(updatedLink);
  } catch (error) {
    next(error);
  }
};
//*--------------------------------------------------------------------------------------Delete a link--------------------------------------------------------------------------------------
export const deleteLink: ExpressHandler = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const userId = req.user?.id;

    const deletedLink = await Link.findOneAndDelete({ _id: linkId, owner: userId });

    if (!deletedLink) {
      res.status(404).json({ message: "Link not found or you do not have permission to delete it." });
      return;
    }

    res.status(200).json({ message: "Link deleted successfully." });
  } catch (error) {
    next(error);
  }
};
//*--------------------------------------------------------------------------------------Reorder Links--------------------------------------------------------------------------------------
export const reorderLinks: ExpressHandler = async (req, res, next) => {
  try {
    const { orderedLinkIds } = req.body;
    const userId = req.user?.id;

    if (!orderedLinkIds || !Array.isArray(orderedLinkIds)) {
      res.status(400).json({ message: "An Array of ordered link IDs is required" });
      return;
    }
    const bulkOps = orderedLinkIds.map((linkId, index) => ({
      updateOne: {
        filter: { _id: linkId, owner: userId },
        update: { $set: { order: index } },
      },
    }));

    if (bulkOps.length > 0) {
      await Link.bulkWrite(bulkOps);
    }

    res.status(200).json({ message: "Links reordered successfully." });
  } catch (error) {
    next(error);
  }
};
//*--------------------------------------------------------------------------------------Count Clicks--------------------------------------------------------------------------------------
export const trackClick: ExpressHandler = async (req, res, next) => {
  try {
    const { linkId } = req.params;

    // Use findByIdAndUpdate with the $inc operator for an efficient atomic update
    await Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } });

    // Send a 204 No Content response, as we don't need to send any data back
    res.sendStatus(204);
  } catch (error) {
    // Pass any errors to the error handler
    next(error);
  }
};
