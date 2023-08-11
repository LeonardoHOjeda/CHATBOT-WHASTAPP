/*
  Warnings:

  - You are about to drop the column `createdAt` on the `senders` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `senders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `senders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `senders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "senders" DROP COLUMN "createdAt",
DROP COLUMN "telephone",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "senders_phone_key" ON "senders"("phone");
