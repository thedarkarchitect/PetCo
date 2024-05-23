import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import request from "supertest";
import testPic from "../utils/testPic";

const prisma = new PrismaClient();
let adminToken;
let userToken;

test("get the Admin token", async () => {
	const response = await request(app)
		.post("/api/v1/auth/login")
		.send({ email: "rose@gmail.com", password: "1234" });

	expect(response.status).toBe(StatusCodes.OK);
	expect(response.body.token).toBeDefined();
	adminToken = response.body.token;
	console.log("admin: "+adminToken);
});

test("get the User token", async () => {
	const response = await request(app)
		.post("/api/v1/auth/login")
		.send({ email: "aba@gmail.com", password: "1234" });

	expect(response.status).toBe(StatusCodes.OK);
	expect(response.body.token).toBeDefined();
	userToken = response.body.token;
    console.log("user: "+userToken);
});

describe("Get all the posts in the db", () => {
	it("no post returned", async () => {
		const response = await request(app).get("/api/v1/posts/");

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	});

	it("return all the quotes", async () => {
		const response = await request(app)
			.get("/api/v1/posts/")
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(StatusCodes.OK);
		expect("application/json");
	});
});

// describe("test the creation of a post", () => {
// 	it("create a post", async () => {
// 		const response = await request(app)
// 			.post("/api/v1/posts/createPost")
// 			.send({
// 				title: "Grooming pets",
// 				content: "Pets deserve to be groomed so they can enjoy their lives",
// 				imageUrl: testPic,
// 			})
// 			.set("Authorization", `Bearer ${userToken}`);

// 		expect(response.status).toBe(StatusCodes.CREATED);
// 		expect(response.body.message).toBe("Post created Successfully");
// 	});
// });

describe("get a post by id", () => {
	it("give an id that doesn't exists", async () => {
		const response = await request(app)
			.get("/api/v1/posts/6565")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.NOT_FOUND);
	});

	it("give an id that exists", async () => {
		const post = await prisma.post.findFirst();
		const response = await request(app)
			.get(`/api/v1/posts/${post.id}`)
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("Post got Successfully");
	});
});

describe("testing update route of post", () => {
	it("wrong id update", async () => {
		const response = await request(app)
			.patch("/api/v1/posts/8686")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	});

	it("correct id update", async () => {
		const post = await prisma.post.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const response = await request(app)
			.patch(`/api/v1/posts/${post.id}`)
			.send({ title: "GRooming" })
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("Post updated Successfully");
		expect(response.body.post).toBeDefined();
	});
});

// describe("delete a post by id", () => {
// 	it("failed to delete a quote", async () => {
// 		const response = await request(app)
// 			.delete("/api/v1/posts/5465")
// 			.set("Authorization", `Bearer ${adminToken}`);

// 		// expect(response.status).toBe(StatusCodes.BAD_REQUEST)
// 		expect(response.body.message).toBe("Post not deleted.");
// 	});

// 	it("post delete", async () => {
// 		const post = await prisma.post.findFirst({
// 			orderBy: {
// 				id: "desc",
// 			},
// 		});
// 		const response = await request(app)
// 			.delete(`/api/v1/posts/${post.id}`)
// 			.set("Authorization", `Bearer ${adminToken}`);

// 		expect(response.status).toBe(StatusCodes.OK);
// 		expect(response.body.message).toBe("Post deleted Successfully");
// 	});
// });
