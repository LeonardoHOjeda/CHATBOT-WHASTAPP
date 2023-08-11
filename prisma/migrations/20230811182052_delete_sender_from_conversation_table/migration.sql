/*
  Warnings:

  - You are about to drop the column `senderId` on the `conversations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_senderId_fkey";

-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "senderId";
