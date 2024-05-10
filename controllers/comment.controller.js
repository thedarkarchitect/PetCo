import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createComment = async (req, res) => {
	try {
		const comment = await prisma.comment.create({
			data: {
				...req.body,
			},
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Comment created Successfully", comment });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Comment not added!", error });
	}
};

const getAllCommentsForPost = async (req, res) => {
	try {
		const { postId } = req.params
		const allComments = await prisma.comment.findMany({
			where: {
				postId: +postId
			}
		});
		res.status(StatusCodes.OK).json({ message: "All Comments", posts: allComments });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Comments", error });
	}
};


const deleteComment = async (req, res) => {
	try {
		const { id } = req.params
		const commentToDelete = await prisma.comment.delete({
			where: {
				id: +id,
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Post deleted Successfully", comment: commentToDelete });
	} catch (error) {
		await prisma.$disconnect();
		res.status(StatusCodes.BAD_REQUEST).json({ message: "Comment not deleted." });
	}
};

export { createComment ,  getAllCommentsForPost, deleteComment};
