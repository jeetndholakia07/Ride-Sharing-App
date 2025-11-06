import cloudinary from "cloudinary";
import { slugify } from "../utils/format.js";
import cloudinaryConfig from "../config/cloudinary.js";

cloudinaryConfig();

const addVerifiedBadge = async (publicId, folder) => {
    try {
        const verifiedIcon = process.env.DEFAULT_TICK_PUBLICID;
        const result = await cloudinary.v2.uploader.explicit(publicId, {
            type: "upload",
            overwrite: true,
            eager: [
                {
                    overlay: verifiedIcon,
                    width: 70,
                    height: 70,
                    gravity: "north_east",
                    x: 20,
                    y: 15,
                    crop: "scale"
                }
            ],
            folder: folder,
            eager_async: false
        });
        return { publicId: result.eager[0].public_id, format: result.format };
    } catch (err) {
        console.error("Error adding verified badge to Cloudinary:", err);
        return null;
    }
}
export default addVerifiedBadge;