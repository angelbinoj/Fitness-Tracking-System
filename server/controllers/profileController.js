import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinaryConfig.js";
import { UserDb } from "../models/userModel.js";

export const getProfile= async(req,res)=>{
    try {
    const user = await UserDb.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ profile: user });

  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }

}

export const updateProfile = async (req, res) => {
  try {
    const userId= req.user.id;

    const user= await UserDb.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
     if (req.file) {
      if (user.profilePic && !user.profilePic.includes("default")) {
        const oldPublicId = getPublicIdFromUrl(user.profilePic);
        if (oldPublicId) {
          await deleteFromCloudinary(oldPublicId);
        }
      }

      req.body.profilePic = req.file.path;
    }
    const updatedUser = await UserDb.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      profile: updatedUser
    });

  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }
};

export const getProfileById = async (req, res) => {
  try {
    const user = await UserDb.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ profile: user });

  } catch (error) {
     res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }
};
