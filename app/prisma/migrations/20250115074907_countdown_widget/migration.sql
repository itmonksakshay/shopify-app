/*
  Warnings:

  - The primary key for the `countdownWidget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `countdownWidget` table. All the data in the column will be lost.
  - The primary key for the `datePickerWidget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `datePickerWidget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shop]` on the table `countdownWidget` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shop]` on the table `datePickerWidget` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "countdownWidget" DROP CONSTRAINT "countdownWidget_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "datePickerWidget" DROP CONSTRAINT "datePickerWidget_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "countdownWidget_shop_key" ON "countdownWidget"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "datePickerWidget_shop_key" ON "datePickerWidget"("shop");
