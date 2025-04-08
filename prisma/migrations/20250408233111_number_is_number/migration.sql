/*
  Warnings:

  - The `number` column on the `drafts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `number` on the `service_orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "drafts" ADD COLUMN     "mandatory_documents_to_b" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "number",
ADD COLUMN     "number" INTEGER;

-- AlterTable
ALTER TABLE "service_orders" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;
