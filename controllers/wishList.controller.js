import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const addToWishList = async (req, res) => {
    try {
        const {userId, productId } = req.body
        const newWishList = await prisma.wishList.create({
            data: {
                user: { connect : { id: userId} },
                products: { connect: { id: productId } }
            },
        });
        res.status(StatusCodes.CREATED).json({ message: "Product added to wishlist", newWishList });
    } catch (error) {
        await prisma.$disconnect()
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Can't add to wishList", error })
    }
}

//get wishlist items for a user
const getUserWishlist = async (req, res) => {
    const { userId } = req.params;
    try {

        const userWishlistItems = await prisma.wishList.findMany({
            where: { userId: +userId },
            include: { products: true }
        });

        res.status(StatusCodes.OK).json({ message: "Fetch User Wishlist", wishList: userWishlistItems });
    } catch(error) {
        await prisma.$disconnect();
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Can't get products in a wishlist", error })
    }
}

const deleteWishlistItem = async (req, res) => {
    try {
        const { wishListId } = req.params;
        
        const deletedWishlistItem = await prisma.wishList.delete({
            where: { id: +wishListId }
        });

        res.status(StatusCodes.OK).json({ message: "Wishlist item deleted", wishlist: deletedWishlistItem });
    } catch(error) {
        await prisma.$disconnect();
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed to delete Wishlist" })
    }
}

const deleteWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedWishlist = await prisma.wishList.deleteMany({
            where: { userId: +userId }
        });

        res.status(StatusCodes.OK).json({ message: "Wishlist deleted", wishlist: deletedWishlist });
    } catch(error) {
        await prisma.$disconnect();
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed to delete Wishlist" })
    }
}

export { addToWishList, getUserWishlist, deleteWishlist, deleteWishlistItem };