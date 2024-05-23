import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

const prisma = new PrismaClient();

let userToken;
let adminToken;


describe("Register user", () => {
    it("route should return 201", async () => {
        const result = await request(app).post("/api/v1/auth/signUp").send({
            firstName: "Velma",
            lastName: "javascript",
            username: "vjavascript",
            email: "velma@gmail.com",
            password: "12345",
            role: "ADMIN",
        });

        expect(result.status).toBe(StatusCodes.CREATED);
        expect(result.body.message).toBe("User has been registered successfully");
    });

    it("route should return 502 ", async () => {
        const result = await request(app).post("/api/v1/auth/signUp").send({
            firstName: "Velma",
            lastName: "javascript",
            username: "vjavascript",
            email: "aba@gmail.com",
            password: "12345",
            role: "ADMIN",
        });

        expect(result.status).toBe(StatusCodes.NOT_ACCEPTABLE);
        expect(result.body.message).toBe("User with email already exists");
    });
});


describe("User Login", () => {
    // it("empty field", async () => {
    //     const response = await request(app).post("/api/v1/auth/login").send({});


    //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
    //     expect(response.body.message).toBe("Provide email and password");
    // });

    it("should return token and 200", async () => {
        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({ email: "rose@gmail.com", password: "1234" });

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe("User LoggedIn Successfully");
        expect(response.body.token).toBeDefined()
    });
});

describe("Delete user", () => {
    it("Fail to delete user by id", async () => {
        const response = await request(app)
            .delete("/api/v1/auth/323")

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });


    it("should delete the user with the given id", async () => {
        const user = await prisma.user.findFirst({
            orderBy: {
                id: "desc",
            },
        });


        const response = await request(app)
            .delete(`/api/v1/auth/${user.id}`)


        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe("User deleted Successfully");


        const deletedUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        expect(deletedUser).toBeNull();
    });
});



