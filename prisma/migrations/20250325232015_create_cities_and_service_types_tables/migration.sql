-- CreateTable
CREATE TABLE "service_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "service_value" DOUBLE PRECISION NOT NULL,
    "days_limit" INTEGER NOT NULL,

    CONSTRAINT "service_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displacement_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_types_code_key" ON "service_types"("code");
