import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createAddress = async (req, res) => {
	try {
        console.log(req.body)
		const newAddresss = await prisma.address.create({
			data: {
                ...req.body,
			},
		});
		res
			.status(StatusCodes.CREATED)
			.json({ message: "Address Created", address: newAddresss });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to create address", error });
	}
};

const getUserAddresses = async (req, res) => {
	try {
		const { userId } = req.params;
		const userAddresses = await prisma.address.findMany({
			where: { userId: +userId },
		});
		res
			.status(StatusCodes.OK)
			.json({ message: "Fetched a user address", userAddresses });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to fetch user addresses", error });
	}
};

const updateAddress = async (req, res) => {
	try {
		const { addressId } = req.params;
		const updatedAddress = await prisma.address.update({
			where: { id: +addressId },
			data: {
				...req.body,
			},
		});
		res
			.status(StatusCodes.CREATED)
			.json({ message: "Address updated", address: updatedAddress });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to update user addresses", error });
	}
};

const deleteAddress = async (req, res) => {
	try {
		const { addressId } = req.params;
		const deletedAddress = await prisma.address.delete({
			where: { id: +addressId },
		});
		res
			.status(StatusCodes.OK)
			.json({
				message: "Address deleted successfully",
				address: deletedAddress,
			});
	} catch (error) {
		await prisma.$disconnect();
		res.status(500).json({ message: "Failed to delete address", error });
	}
};

export { createAddress, getUserAddresses, updateAddress, deleteAddress };
