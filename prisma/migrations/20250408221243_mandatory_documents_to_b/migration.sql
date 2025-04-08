-- AlterTable
ALTER TABLE "service_orders" ADD COLUMN     "mandatory_documents_to_b" TEXT[] DEFAULT ARRAY[]::TEXT[];
