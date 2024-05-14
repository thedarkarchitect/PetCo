import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createPet = async (req, res) => {
	try {
		const { ownerId } = req.body;
		const pet = await prisma.pet.create({
			data: {
				...req.body,
				ownerId: +ownerId
                // owner: { connect : { id: +ownerId } }
			},
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Pett created Successfully", pet });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Pet not added!", error });
	}
};

const getPets = async (req, res) => {
	try {
		const allPets = await prisma.pet.findMany({
			include: {
				owner: true
			}
		});
		res.status(StatusCodes.OK).json({ message: "All Pets of Owner", Pets: allPets });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Pets", error });
	}
};

const getOwnerPets = async (req, res) => {
	try {
        const { ownerId } = req.params;
		const allPets = await prisma.pet.findMany({
			where:{
                ownerId: +ownerId
            },
			include: {
				owner: true
			}
		});
		res.status(StatusCodes.OK).json({ message: "All Pets of Owner", Pets: allPets });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Pets", error });
	}
};

const getPetById = async (req, res) => {
	try {
		const { petId } = req.params

		const pet = await prisma.pet.findUnique({
			where: {
				id: +petId,
			}
		});

		if (pet) {
			res.status(StatusCodes.OK).json({
				message: "Pet got Successfully",
				pet,
			});
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ messaage: "Pet was not got by id", error });
	}
};

const updatePet = async (req, res) => {
	try {
		const { petId } = req.params;
		const { ownerId } = req.body
		
		const PetUpdate = await prisma.pet.update({
			where: {
				id: +petId,
			},
			data: {
				...req.body,
				ownerId: +ownerId,
			},
		});

			res
				.status(StatusCodes.OK)
				.json({ message: "Pet updated Successfully", pet: PetUpdate });
		
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Pet has not been updated", error });
	}
};

const deletePet = async (req, res) => {
	try {
		const { petId } = req.params

		const PetToDelete = await prisma.pet.delete({
			where: {
				id: parseInt(petId),
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Pet deleted Successfully", pet: PetToDelete });
	} catch (error) {
		await prisma.$disconnect();
		res.status(StatusCodes.BAD_REQUEST).json({ message: "Pet not deleted." });
	}
};

export { createPet, getPets, getOwnerPets, updatePet, getPetById, deletePet };
