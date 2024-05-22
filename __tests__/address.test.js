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

describe("Get user address in the db", () => {
	it("no address returned", async () => {
        const user = await prisma.user.findFirst();
		const response = await request(app).get(`/api/v1/address/user-address/${user.id}`);

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	});

    it("user id doesn't exist", async () => {
		const response = await request(app)
            .get("/api/v1/address/user-address/654")
            .set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe("user with id doesn't exist")
	});

    it("return no address", async () => {
        const user = await prisma.user.findFirst({

        });
		const response = await request(app)
			.get(`/api/v1/address/user-address/${user.id}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.OK);

	});

	it("return all the user addresses", async () => {
        const user = await prisma.user.findFirst({
            orderBy: {id: "desc"}
        });
		const response = await request(app)
			.get(`/api/v1/address/user-address/${user.id}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.OK);
		expect("application/json");
	});
});

describe("test the creation of a address", () => {
	it("create a post", async () => {
		const response = await request(app)
			.post("/api/v1/address/")
			.send({
				"userId": 6,
                "district": "Kampala",
                "city": "Kampala",
                "street": "Sir Apollo Kaggawa"
			})
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body.message).toBe("Address Created");
	});
});

describe("testing update route of post", () => {
	it("wrong id update", async () => {
		const response = await request(app)
			.patch("/api/v1/address/update-address/8686")
            .send({city: "jinja"})
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	});

	it("correct id update", async () => {
		const address = await prisma.address.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const response = await request(app)
			.patch(`/api/v1/address/update-address/${address.id}`)
			.send({ street: "Jinja" })
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body.message).toBe("Address updated");
		expect(response.body.address).toBeDefined();
	});
});

describe("delete a address by id", () => {
	it("failed to delete a address", async () => {
		const response = await request(app)
			.delete("/api/v1/address/delete-address/5465")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body.message).toBe("Failed to delete address");
	});

	it("post delete", async () => {
		const address = await prisma.address.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const response = await request(app)
			.delete(`/api/v1/address/delete-address/${address.id}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("Address deleted successfully");
	});
});
