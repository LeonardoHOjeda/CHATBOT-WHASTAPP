/*
  Warnings:

  - You are about to drop the column `id_sender` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `conversation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "label_conversations" DROP CONSTRAINT "label_conversations_id_conversation_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_id_conversation_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_id_sender_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_id_conversation_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "id_sender",
ADD COLUMN     "is_from_me" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "conversation";

-- CreateTable
CREATE TABLE "conversations" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_client" INTEGER NOT NULL,
    "id_admin" INTEGER NOT NULL,
    "senderId" INTEGER,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversations_id_client_id_admin_key" ON "conversations"("id_client", "id_admin");

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "label_conversations" ADD CONSTRAINT "label_conversations_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
