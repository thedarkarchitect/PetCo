import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

const prisma = new PrismaClient();

describe("Get all the appointments in the db", () => {
	// it("no appointments returned", async () => {
	// 	const response = await request(app).get("/api/v1/appointments/");

	// 	expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	// });

	it("return all the appointments", async () => {
		const response = await request(app)
			.get("/api/v1/appointments/")

		expect(response.status).toBe(StatusCodes.OK);
		expect("application/json");
	});
});

describe("test the creation of an appointment", () => {
	it("create a post", async () => {
		const response = await request(app)
			.post("/api/v1/appointments/createAppointment")
			.send({
				"petId": 2,
				"ownerId": 9,
				"service": "PHOTOGRAPHY",
				"appointmentDate": "2024-05-23",
				"notes": "he is a good boy"
			})

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
		expect(response.body.message).toBe("appointment not added!");
	});

	it("create a post", async () => {
		const response = await request(app)
			.post("/api/v1/appointments/createAppointment")
			.send({
				"petId": 9,
				"ownerId": 2,
				"service": "PHOTOGRAPHY",
				"appointmentDate": "2024-05-23",
				"notes": "he is a good boy"
			})

		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body.message).toBe("appointment created Successfully");
	});
});

describe("get a appointment by id", () => {
	// it("give an id that doesn't exists", async () => {
	// 	const response = await request(app)
	// 		.get("/api/v1/appointments/2")
	// 		.set("Authorization", `Bearer ${userTokenToken}`);

	// 	expect(response.status).toBe(StatusCodes.NOT_FOUND);
	// });

	it("give an id that exists", async () => {
		const user = await prisma.user.findFirst({
			orderBy:{
				id: "desc"
			}
		});
		const response = await request(app)
			.get(`/api/v1/appointments/user-appointments/${user.id}`)

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("All appointments");
	});
});

describe("get a appoint by id", () => {
	it("give an id that doesn't exists", async () => {
		const response = await request(app)
			.get("/api/v1/appointments/get-appointment/465456")

		expect(response.status).toBe(StatusCodes.NOT_FOUND);
		expect(response.body.message).toBe("appointment doesn't exist")
	});

	it("give an id that exists", async () => {
		const appointment = await prisma.appointment.findFirst({
			orderBy:{
				id: "desc"
			}
		});
		const response = await request(app)
			.get(`/api/v1/appointments/get-appointment/${appointment.id}`)

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("appointment got Successfully");
	});
});

describe("testing update route of appointments", () => {
	it("wrong id update", async () => {
		const response = await request(app)
			.patch("/api/v1/appointments/update-appointment/14654")

		expect(response.status).toBe(StatusCodes.BAD_REQUEST);
		expect(response.body.message).toBe("appointment has not been updated");
	});

	it("correct id update", async () => {
		const appointment = await prisma.appointment.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const response = await request(app)
			.patch(`/api/v1/appointments/update-appointment/${appointment.id}`)
			.send({ appointmentDate: "2024-05-23" })

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("appointment updated Successfully");
		expect(response.body.appointment).toBeDefined();
	});
});

describe("delete a appointment by id", () => {
	it("failed to delete a appointment", async () => {
		const response = await request(app)
			.delete("/api/v1/appointments/delete-appointment/5465")

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body.message).toBe("appointment not deleted.");
	});

	it("appointment delete", async () => {
		const appointment = await prisma.appointment.findFirst({
			orderBy: {
				id: "desc",
			},
		});
		const response = await request(app)
			.delete(`/api/v1/appointments/delete-appointment/${appointment.id}`)

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body.message).toBe("appointment deleted Successfully");
	});
});
