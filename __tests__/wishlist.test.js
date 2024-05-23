import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

const prisma = new PrismaClient();

describe("get a wishlist by user id", () => {
	it("give an id that doesn't exists", async () => {
		const response = await request(app)
			.get("/api/v1/wishlist/get-user-wishlist/5545")

		expect(response.body.message).toBe("No wishlist items");
	});

	it("give an id that exists", async () => {
		const user = await prisma.user.findFirst();
		const response = await request(app)
			.get(`/api/v1/wishlist/get-user-wishlist/${user.id}`)

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("Fetch User Wishlist");
        expect(response.body.wishList).toBeDefined()
	});
});

describe("test the creation of a wishlist", () => {
	it("create a post", async () => {
		const response = await request(app)
			.post("/api/v1/wishlist/add-to-wishlist")
			.send({
				userId: 2,
                productId: 15
			})

		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body.message).toBe("Product added to wishlist");
	});
});

// describe("delete wishlist by id", () => {
// 	it("failed to delete a wishlist", async () => {
// 		const response = await request(app)
// 			.delete("/api/v1/wishlist/delete-user-wishlist/5545")
// 			.set("Authorization", `Bearer ${userToken}`);

// 		expect(response.status).toBe(StatusCodes.NOT_FOUND)
// 		expect(response.body.message).toBe("WishList does not exist");
// 	});

// 	it("wishlist delete", async () => {
// 		const user = await prisma.user.findFirst();
// 		const response = await request(app)
// 			.delete(`/api/v1/wishlist/delete-user-wishlist/${user.id}`)
// 			.set("Authorization", `Bearer ${userToken}`);

// 		expect(response.status).toBe(StatusCodes.OK);
// 		expect(response.body.message).toBe("Wishlist deleted");
// 	});
// });

describe("delete wishlist by id", () => {
	it("failed to delete a item", async () => {
		const response = await request(app)
			.delete("/api/v1/wishlist/delete-wishlist-item/5545")

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body.message).toBe("Failed to delete Wishlist item");
	});

	it("item delete", async () => {
		const item = await prisma.wishList.findFirst({
            orderBy: {
                id: "desc"
            }
        })
		const response = await request(app)
			.delete(`/api/v1/wishlist/delete-wishlist-item/${item.id}`)


		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("Wishlist item deleted");
	});
});