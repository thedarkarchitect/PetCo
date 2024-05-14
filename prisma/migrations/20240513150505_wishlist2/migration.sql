/*
  Warnings:

  - You are about to drop the `_ProductToWishList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToWishList" DROP CONSTRAINT "_ProductToWishList_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToWishList" DROP CONSTRAINT "_ProductToWishList_B_fkey";

-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductToWishList";

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
