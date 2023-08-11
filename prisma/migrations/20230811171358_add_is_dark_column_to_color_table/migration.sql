/*
  Warnings:

  - You are about to drop the column `id_color` on the `labels` table. All the data in the column will be lost.
  - Added the required column `is_dark` to the `colors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_background_color` to the `labels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "labels" DROP CONSTRAINT "labels_id_color_fkey";

-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "is_dark" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "labels" DROP COLUMN "id_color",
ADD COLUMN     "id_background_color" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "labels" ADD CONSTRAINT "labels_id_background_color_fkey" FOREIGN KEY ("id_background_color") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
