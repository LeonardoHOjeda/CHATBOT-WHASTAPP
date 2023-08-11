/*
  Warnings:

  - You are about to drop the column `color` on the `labels` table. All the data in the column will be lost.
  - You are about to drop the column `conversation_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `conversationId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `user_sender` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_sender` table. All the data in the column will be lost.
  - You are about to drop the `label_message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_color` to the `labels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_conversation` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sender` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_conversation` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_role` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sender` to the `user_sender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `user_sender` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "label_message" DROP CONSTRAINT "label_message_labelId_fkey";

-- DropForeignKey
ALTER TABLE "label_message" DROP CONSTRAINT "label_message_messageId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_senderId_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_sender" DROP CONSTRAINT "user_sender_senderId_fkey";

-- DropForeignKey
ALTER TABLE "user_sender" DROP CONSTRAINT "user_sender_userId_fkey";

-- AlterTable
ALTER TABLE "labels" DROP COLUMN "color",
ADD COLUMN     "id_color" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "conversation_id",
DROP COLUMN "senderId",
ADD COLUMN     "id_conversation" INTEGER NOT NULL,
ADD COLUMN     "id_sender" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "conversationId",
DROP COLUMN "userId",
ADD COLUMN     "id_conversation" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "profilePicture",
DROP COLUMN "roleId",
ADD COLUMN     "id_role" INTEGER NOT NULL,
ADD COLUMN     "profile_picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_sender" DROP COLUMN "senderId",
DROP COLUMN "userId",
ADD COLUMN     "id_sender" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- DropTable
DROP TABLE "label_message";

-- CreateTable
CREATE TABLE "label_conversations" (
    "id" SERIAL NOT NULL,
    "id_label" INTEGER NOT NULL,
    "id_conversation" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "label_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sender" ADD CONSTRAINT "user_sender_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sender" ADD CONSTRAINT "user_sender_id_sender_fkey" FOREIGN KEY ("id_sender") REFERENCES "senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_sender_fkey" FOREIGN KEY ("id_sender") REFERENCES "senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labels" ADD CONSTRAINT "labels_id_color_fkey" FOREIGN KEY ("id_color") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "label_conversations" ADD CONSTRAINT "label_conversations_id_label_fkey" FOREIGN KEY ("id_label") REFERENCES "labels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "label_conversations" ADD CONSTRAINT "label_conversations_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
