import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

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
    console.log("admin: "+ adminToken);
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

describe("Get all the pets in the db", () => {
	it("no pets returned", async () => {
		const response = await request(app)
            .get("/api/v1/pet/");

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	});

	it("return all the pets", async () => {
		const response = await request(app)
			.get("/api/v1/pet/")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(StatusCodes.OK);
		expect("application/json");
	});
});

describe("test the creation of a pet", () =>{
    it("create a pet", async () => {
        const response = await request(app)
            .post("/api/v1/pet/create-pet")
            .send({
                name: "George",
                type: "DOG",
                breed: "shepherd",
                age: 7,
                ownerId: 2,
            })
            .set("Authorization",  `Bearer ${userToken}`);
        
        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.message).toBe("Pet created Successfully");
    });
});


describe("get a pet by id", () => {
    it("give an id that doesn't exists", async () => {
        const response = await request(app)
            .get("/api/v1/pet/get-pet/6565")
            .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("give an id that exists", async () => {
        const pet = await prisma.pet.findFirst();
        const response = await request(app)
            .get(`/api/v1/pet/get-pet/${pet.id}`)
            .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body.message).toBe("Pet got Successfully.")
    });
});

describe("get a pet by ownerid", () => {
    it("given an id that doesn't exists", async () => {
        const response = await request(app)
            .get("/api/v1/pet/get-owner-pet/6565")
            .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe("Owner doesn't exist");
    });

    it("given an id that exists", async () => {
        const response = await request(app)
            .get("/api/v1/pet/get-owner-pet/3")
            .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.body.message).toBe("no pets for owner");
    });

    it("give an id that exists", async () => {
        const owner = await prisma.user.findFirst();

        const response = await request(app)
            .get(`/api/v1/pet/get-owner-pet/${owner.id}`)
            .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.status).toBe(StatusCodes.OK)
        expect(response.body.message).toBe("All Pets of Owner")
    });
});

describe("testing update route of pet", () => {
    it("wrong id update", async () => {
        const response = await request(app)
            .patch("/api/v1/pet/update-pet/8686")
            .set("Authorization", `Bearer ${adminToken}`)
        
        expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        expect(response.body.message).toBe("Pet has not been updated")
    })

    it("correct id update", async () => {
        const pet = await prisma.pet.findFirst({
            orderBy: {
                id: "desc"
            }
        });

        const response = await request(app)
            .patch(`/api/v1/pet/update-pet/${pet.id}`)
            .send({name: "Rexon"})
            .set("Authorization",  `Bearer ${adminToken}`);
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe("Pet updated Successfully")
        expect(response.body.pet).toBeDefined()
    })
});

describe("delete a post by id", () => {
    it("failed to delete a post", async () => {
        const response = await request(app)
            .delete("/api/v1/pet/delete-pet/5465")
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        expect(response.body.message).toBe("Pet not deleted.")
    })

    it("pet delete", async () => {
        const pet = await prisma.pet.findFirst({
            orderBy: {
                id: "desc"
            }
        })
        const response = await request(app)
            .delete(`/api/v1/pet/delete-pet/${pet.id}`)
            .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe("Pet deleted Successfully");
    })
});