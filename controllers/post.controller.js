import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../utils/cloudinaryConfig.js";

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const prisma = new PrismaClient();

const createPost = async (req, res) => {
	try {
		const { title, content, imageUrl } = req.body;
		
		const result = await cloudinary.uploader.upload(imageUrl, { upload_preset: "ml_default"});

		const post = await prisma.post.create({
			data: {
				title,
				content,
				imageUrl: result.secure_url,
			},
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Post created Successfully", post });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Post not added!", error });
	}
};

const getPosts = async (req, res) => {
	try {
		const allPosts = await prisma.post.findMany({
			include: {
				comment: true,
			},
		});
		res.status(StatusCodes.OK).json({ message: "All Posts", posts: allPosts });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Users", error });
	}
};

const getPostById = async (req, res) => {
	try {
		const { id } = req.params;

		const post = await prisma.post.findUnique({
			where: {
				id: +id,
			},
			include: {
				comment: true,
			},
		});

		if (post) {
			res.status(StatusCodes.OK).json({
				message: "Post got Successfully",
				post,
			});
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ messaage: "Post was not got by id", error });
	}
};

const updatePost = async (req, res) => {
	try {
		const { id } = req.params;

		const postUpdate = await prisma.post.update({
			where: {
				id: +id,
			},
			data: {
				...req.body,
			},
		});

		if (postUpdate) {
			res
				.status(StatusCodes.OK)
				.json({ message: "Post updated Successfully", post: postUpdate });
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Post has not been updated", error });
	}
};

const deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		const postToDelete = await prisma.post.delete({
			where: {
				id: parseInt(id),
			},
			include: {
				comment: true,
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Post deleted Successfully", post: postToDelete });
	} catch (error) {
		await prisma.$disconnect();
		res.status(StatusCodes.BAD_REQUEST).json({ message: "Post not deleted." });
	}
};

export { createPost, getPosts, updatePost, getPostById, deletePost };
