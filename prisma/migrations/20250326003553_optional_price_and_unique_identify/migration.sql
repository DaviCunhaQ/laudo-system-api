/*
  Warnings:

  - A unique constraint covering the columns `[identify]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identify` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "identify" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service_types" ALTER COLUMN "service_value" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cities_identify_key" ON "cities"("identify");
