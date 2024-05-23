import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createPet = async (req, res) => {
	try {
		const { ownerId, age } = req.body;
		console.log(ownerId, age);
		const pet = await prisma.pet.create({
			data: {
				...req.body,
				age: +age,
				ownerId: +ownerId,
			},
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Pet created Successfully", pet });
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
				owner: true,
			},
		});
		res
			.status(StatusCodes.OK)
			.json({ message: "All Pets of Owner", Pets: allPets });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Pets", error });
	}
};

const getOwnerPets = async (req, res) => {
	const { ownerId } = req.params;
	try {
		
		const owner = await prisma.user.findUnique({
			where: {
				id: +ownerId
			}
		})

		if (owner) {
			
			const allPets = await prisma.pet.findMany({
				where: {
					ownerId: +ownerId,
				},
				include: {
					owner: true,
				},
			});
			if(allPets.length === 0){
				res.json({message: "no pets for owner"})
			} else{
				res
				.status(StatusCodes.OK)
				.json({ message: "All Pets of Owner", Pets: allPets });
			}
			
		} else {
			res.status(StatusCodes.NOT_FOUND).json({
				message: "Owner doesn't exist",
			});
		}
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Pets", error });
	}
};

const getPetById = async (req, res) => {
	try {
		const { petId } = req.params;

		const pet = await prisma.pet.findUnique({
			where: {
				id: +petId,
			},
		});

		if (pet) {
			res.status(StatusCodes.OK).json({
				message: "Pet got Successfully.",
				pet,
			});
		} else {
			res.status(StatusCodes.NOT_FOUND).json({
				message: "Pet does not exist.",
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

		const PetUpdate = await prisma.pet.update({
			where: {
				id: +petId,
			},
			data: {
				...req.body,
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
		const { petId } = req.params;

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
