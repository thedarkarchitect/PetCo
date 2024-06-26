import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

const prisma = new PrismaClient();


describe("test the creation of a post", () => {
	it("create a post", async () => {
		const response = await request(app)
			.post("/api/v1/comments/createComment")
			.send({
				content: "Pets deserve to be groomed so they can enjoy their lives",
				postId: 15,
                authorId: 6
			})

		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body.message).toBe("Comment created Successfully");
	});
});

describe("get a comment by post id", () => {
	it("give an id that doesn't exists", async () => {
		const response = await request(app)
			.get("/api/v1/comments/post-comments/89")

        expect(response.status).toBe(StatusCodes.NOT_FOUND)
		expect(response.body.message).toBe("Post doesnt exist");
	});

	it("give an id that exists", async () => {
		const post = await prisma.post.findFirst();
		const response = await request(app)
			.get(`/api/v1/comments/post-comments/${post.id}`)

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("All Post Comments");
	});
});

describe("delete a post by id", () => {
	it("failed to delete a quote", async () => {
		const response = await request(app)
			.delete("/api/v1/comments/delete-post-comment/78")

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body.message).toBe("Comment not deleted.");
	});

	it("post delete", async () => {
		const comment = await prisma.comment.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const response = await request(app)
			.delete(`/api/v1/comments/delete-post-comment/${comment.id}`)

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("Post deleted Successfully");
	});
});
