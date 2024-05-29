import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { createJWTtoken } from "../utils/token-handler.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
	const { email } = req.body;
	try {

		const user = await prisma.user.findUnique({
			//find the user to test if they exist before you re-add
			where: {
				email: email,
			},
		});

		if (user != null && user.email === email) {
			//check if the user exists
			res
				.status(StatusCodes.NOT_ACCEPTABLE)
				.json({ message: "User with email already exists" });
		} else {
			const salt = await bcrypt.genSalt();
			const hash = await bcrypt.hash(req.body.password, salt);

			const registerUser = await prisma.user.create({
				data: {
					...req.body,
					password: hash,
				},
			});

			res
				.status(StatusCodes.CREATED)
				.json({ message: "User has been registered successfully", user: registerUser });
		}
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "User not added!", error });
	}
};

const loginUser = async (req, res) => {

	try {
		const { email, password } = req.body;

		if(!email || !password) {
			return res.status(StatusCodes.NOT_FOUND).json({message: "Provide email and password"})
		}
        
		const user = await prisma.user.findUnique({
				where: {
					email: email,
				},
			})
		const verifyPassword = bcrypt.compare(password, user.password);

		if (verifyPassword) {
			let data = { userid: user.id, username: user.username, role: user.role };
			const accessToken = createJWTtoken(data);
			res
				.status(StatusCodes.OK)
				.json({ message: "User LoggedIn Successfully", user, token: accessToken });
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Password or Email entered is incorrect. Login again" });
	}
};

const getUsers = async (req, res) => {
	try {
		const allUsers = await prisma.user.findMany();
		res.status(StatusCodes.OK).json({ message: "Users returned", allUsers });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Can't get Users", error });
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params

	try {

		const user = await prisma.user.findUnique({
			where: {
				id: +id,
			},
		});

		if (user) {
			res.status(StatusCodes.OK).json({
				message: "User got Successfully",
				user,
			});
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ messaage: "User was not got by id", error });
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params
	
	try {
			let hashed;
			//the password if updated must be rehased
			if(req.body.password){
				const salt = await bcrypt.genSalt();
        		return hashed = await bcrypt.hash(req.body.password, salt);
			} else {}
        
		const updatedUser = await prisma.user.update({
			where: {
				id: +id,
			},
			data: {
				...req.body,
				password: hashed
			},
		});

		if (updatedUser) {
			res
				.status(StatusCodes.OK)
				.json({ message: "User updated Successfully", user: updatedUser });
		}
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "User has not been updated", error });
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params
	try {
		const userDeleted = await prisma.user.delete({
			where: {
				id: +id,
			},
		});

		if(!userDeleted){
			res.status(StatusCodes.NOT_FOUND)
		}

		res
			.status(StatusCodes.OK)
			.json({ message: "User deleted Successfully", user: userDeleted });
	} catch (error) {
		await prisma.$disconnect();
		res.status(StatusCodes.BAD_REQUEST).json({ message: "User not deleted." });
	}
};


export { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
