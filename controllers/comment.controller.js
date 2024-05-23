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
	const { postId } = req.params;
	try {
		const post = await prisma.post.findUnique({
			where:{
				id: +postId
			}
		})

		if(post){
			const allComments = await prisma.comment.findMany({
				where: {
					postId: +postId,
				},
			});
	
			if (allComments.length === 0) {
				res.json({ message: "Post has no comments" });
			}
			{
				res
					.status(StatusCodes.OK)
					.json({ message: "All Post Comments", comment: allComments });
			}
		} else {
			res.status(StatusCodes.NOT_FOUND).json({ message: "Post doesnt exist" })
		}
		
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Comments", error });
	}
};

const deleteComment = async (req, res) => {
	try {
		const { id } = req.params;
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
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Comment not deleted." });
	}
};

export { createComment, getAllCommentsForPost, deleteComment };
