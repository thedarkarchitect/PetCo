/*
  Warnings:

  - The values [HEALTH_AND_WELLNESS] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('PET_FOOD', 'PET_SUPPLIES', 'PET_FURNITURE', 'TOYS', 'GROOMING_PRODUCTS', 'APPAREL', 'TRAINING_AIDS', 'HOUSING', 'BOOKS_AND_EDUCATIONAL_MATERIALS', 'GIFTS_AND_SPECIALTY_ITEMS');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "Categories_new" USING ("category"::text::"Categories_new");
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;
