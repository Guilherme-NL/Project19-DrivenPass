/*
  Warnings:

  - You are about to drop the column `CVC` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `cvc` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "CVC",
ADD COLUMN     "cvc" TEXT NOT NULL;
