import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createAppointment = async (req, res) => {
	try {
        const { petId, ownerId } = req.body
		console.log(req.body)
		const appointment = await prisma.appointment.create({
			data: {
				petId: +petId,
				ownerId: +ownerId,
				...req.body,
			},
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "appointment created Successfully", appointment });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "appointment not added!", error });
	}
};

//get all appointment for a user
const getUserAppointments = async (req, res) => {
	try {
        const { ownerId } = req.body.params;
		const allappointments = await prisma.appointment.findMany({
			where: {
                ownerId: +ownerId
            },
            include: { pet: true }
		});
		res.status(StatusCodes.OK).json({ message: "All appointments", appointments: allappointments });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Users", error });
	}
};

//get all appointment for a user
const getAppointments = async (req, res) => {
	try {
		const allappointments = await prisma.appointment.findMany({
            include: { pet: true }
		});
		res.status(StatusCodes.OK).json({ message: "All appointments", appointments: allappointments });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Users", error });
	}
};

//get an appointment by it's id
const getAppointmentById = async (req, res) => {
	try {
		const { id } = req.params

		const appointment = await prisma.appointment.findUnique({
			where: {
				id: +id,
			},
			include: {
				pet: true
			}
		});

		if (appointment) {
			res.status(StatusCodes.OK).json({
				message: "appointment got Successfully",
				appointment,
			});
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ messaage: "appointment was not got by id", error });
	}
};

const updateAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const appointmentUpdate = await prisma.appointment.update({
			where: {
				id: +id,
			},
			data: {
				...req.body,
			},
		});

			res
				.status(StatusCodes.OK)
				.json({ message: "appointment updated Successfully", appointment: appointmentUpdate });
		
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "appointment has not been updated", error });
	}
};

const deleteAppointment = async (req, res) => {
	try {
		const { id } = req.params

		const appointmentToDelete = await prisma.appointment.delete({
			where: {
				id: parseInt(id),
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "appointment deleted Successfully", appointment: appointmentToDelete });
	} catch (error) {
		await prisma.$disconnect();
		res.status(StatusCodes.BAD_REQUEST).json({ message: "appointment not deleted." });
	}
};

export { createAppointment, getAppointments, updateAppointment, getAppointmentById, getUserAppointments, deleteAppointment };
