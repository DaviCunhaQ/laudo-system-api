/*
  Warnings:

  - You are about to drop the `drafts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order_number]` on the table `service_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date_expire` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_message` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hello_message` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `service_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "drafts" DROP CONSTRAINT "drafts_city_fkey";

-- DropForeignKey
ALTER TABLE "drafts" DROP CONSTRAINT "drafts_order_type_fkey";

-- AlterTable
ALTER TABLE "service_orders" ADD COLUMN     "concluded_date" TEXT,
ADD COLUMN     "date_expire" TEXT NOT NULL,
ADD COLUMN     "form_message" TEXT NOT NULL,
ADD COLUMN     "hello_message" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "block" DROP NOT NULL,
ALTER COLUMN "batch" DROP NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "coordenates" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL;

-- DropTable
DROP TABLE "drafts";

-- CreateIndex
CREATE UNIQUE INDEX "service_orders_order_number_key" ON "service_orders"("order_number");
