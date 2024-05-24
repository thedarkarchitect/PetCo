import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../utils/cloudinaryConfig.js";


const prisma = new PrismaClient();

const getAllproducts = async (req, res) => {
	try {
		const Products = await prisma.product.findMany();
		res
			.status(StatusCodes.OK)
			.json({ message: "All Products", count: Products.length, products: Products });
	} catch (error) {
        await prisma.$disconnect()
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Products can't be got", error });
	}
};

const createProduct = async (req, res) => {
	try {
		const { name, description, category, price, quantity, imageUrl } = req.body;
				
		const result = await cloudinary.uploader.upload(imageUrl, { upload_preset: "ml_default"});
		const product = await prisma.product.create({
			data: {
				name,
				description,
				price: +price,
				category,
				quantity: +quantity,
				imageUrl: result.secure_url
			}
		});
		
		res
			.status(StatusCodes.CREATED)
			.json({ message: "Product createed successfully", product });
	} catch (error) {
        await prisma.$disconnect()
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Product not created", error });
	}
};

const getProductById = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await prisma.product.findUnique({
			where: {
				id: +id,
			},
		});

        if(!product) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" })
        }
		res
			.status(StatusCodes.OK)
			.json({ message: "Product got Successfully", product });
	} catch (error) {
        await prisma.$disconnect()
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Failed To Fetch Product", error });
	}
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
		// const { price, quantity} = req.body;
        const updatedProduct = await prisma.product.update({
            where: {
                id: +id
            },
            data: {
				// price: +price,
				// quantity: +quantity,
                ...req.body
            }
        })

        res.status(StatusCodes.CREATED).json({ message: "Product updated successfully", updatedProduct })
    } catch(error) {
        await prisma.$disconnect()
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed To update", error })
    }

}

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProduct = await prisma.product.delete({
			where: {
				id: +id,
			},
		});

		res
			.status(StatusCodes.OK)
			.json({ message: "Product deleted successfully", deletedProduct });
	} catch (error) {
        await prisma.$disconnect()
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Product failed to delete", error });
	}
};

const searchProducts = async (req, res) => {
	try{
		const { category, name } = req.query
		
		let where = {}

		if(category) {
			where.category = category;
		}

		if(name) {
			where.name = {
				contains: name,
				mode: "insensitive" // Case-insensitive search
			}
		}
		const products = await prisma.product.findMany({
			where
		})
		if(!products){
			res.status(StatusCodes.NOT_FOUND).json({ message: "search not found!"})
		}
		res.status(StatusCodes.OK).json({ message: "products found", products})
	} catch(error) {
		await prisma.$disconnect()
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Product(s) not found", error });
	}
}

export { getAllproducts, createProduct, getProductById, updateProduct, deleteProduct, searchProducts };
