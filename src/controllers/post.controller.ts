import DatabaseService from "../utils/database";
import ResponseService from "../utils/response.utils";
import PostModel from "../models/Post.model";

export const createPosts = async (req: Request, res: Response) => {
    const { caption, imageUrl, location, tags = [] } = req.body;

    if (!imageUrl) {
        return ResponseService.error(res, "image url is require", 400, {});
    }

    try {
        const db = new DatabaseService(PostModel);
        const body = { imageUrl, tags, user: req.user.id };
        if (caption) {
            body.caption = caption;
        }

        if (location) {
            body.location = location;
        }

        const data = await db.create(body);
        ResponseService.success(res, data, "Post created Successfully", 201);
    } catch (err) {
        ResponseService.error(res, "Something went wrong", 500, err);
    }
};
export const getPosts = () => {};
export const getPostById = () => {};
export const updatePostById = () => {};
export const deletePostById = () => {};
export const likePostById = () => {};
export const getPostLike = () => {};
export const getPostByUserId = () => {};
export const archivePost = () => {};
