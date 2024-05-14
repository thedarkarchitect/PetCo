import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
	try {
		const { userId, products, totalprice, addressId, isComplete } = req.body;

		// console.log(req.body)
		// Create the order
		const order = await prisma.order.create({
			data: {
				user: { connect: { id: +userId } },
				products: products,
				totalprice: +totalprice,
				isComplete,
				address: { connect: { id: +addressId } },
			},
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Order created successfully", order });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed To create Order." });
	}
};

const getUserOrders = async (req, res) => {
	//get all the orders of a user
	try {
		const { userId } = req.params;
		console.log(userId);
		const userOrders = await prisma.order.findMany({
			where: { userId: +userId },
			include: {
				address: true,
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Orders fetched Successfully", orders: userOrders });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to fetch orders", error });
	}
};

// const getOrders = async (req, res) => { //get all the orders of a user
//     try{
//         const { orderId} = req.params;
//         const orders = await prisma.order.findMany({
//             where: {
//                 id: +orderId
//             },
//             include: {
//                 address: true
//             }
//         })

//         res.status(StatusCodes.OK).json( { message: "Orders fetched Successfully", orders } )
//     } catch (error) {
//         await prisma.$disconnect()
//         res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed to fetch orders", error })
//     }
// }

const getOrderById = async (req, res) => {
	//get an order by id
	try {
		const { orderId } = req.params;

		const order = await prisma.order.findUnique({
			where: { id: +orderId },
			include: {
				address: true,
			},
		});
		if (!order) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "Order not Found" });
		}
		res
			.status(StatusCodes.OK)
			.json({ message: "Order Fetched Successfully", order });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to fetch order" });
	}
};

const updateOrder = async (req, res) => {
	//get an order by id
	try {
		const { orderId } = req.params;

		const orderUpdated = await prisma.order.update({
			where: { id: +orderId },
			data: {
				...req.body,
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Order Fetched Successfully", order: orderUpdated });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to update order" });
	}
};

const deleteOrder = async (req, res) => {
	try {
		const { orderId } = req.params;

		const deletedOrder = await prisma.order.delete({
			where: { id: +orderId },
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Order Deleted Successfully", order: deletedOrder });
	} catch (error) {
		await prisma.$disconnect();
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed to delete order", error });
	}
};

export { createOrder, getUserOrders, getOrderById, deleteOrder, updateOrder };
