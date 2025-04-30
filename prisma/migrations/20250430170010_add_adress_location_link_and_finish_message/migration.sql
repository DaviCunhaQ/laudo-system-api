-- AlterTable
ALTER TABLE "service_orders" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "finish_message" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location_link" TEXT;
