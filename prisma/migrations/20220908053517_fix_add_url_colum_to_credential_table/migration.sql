/*
  Warnings:

  - Added the required column `url` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "url" TEXT NOT NULL;
