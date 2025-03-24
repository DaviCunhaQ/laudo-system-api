-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ParticipationRole" AS ENUM ('PASSAGEIRO', 'PEDESTRE', 'TESTEMUNHA');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('SEM_FERIMENTOS', 'FERIDO', 'OBITO');

-- CreateEnum
CREATE TYPE "OccurrenceStaus" AS ENUM ('ABERTO', 'ENCERRADO', 'EM_PROGRESSO');

-- CreateEnum
CREATE TYPE "TrafficImpact" AS ENUM ('BLOQUEIO_TOTAL', 'BLOQUEIO_PARCIAL', 'TRANSITO_LENTO', 'DESVIO_NECESSARIO', 'CONGESTIONAMENTO_INTENSO', 'CONGESTIONAMENTO_MODERADO', 'CONGESTIONAMENTO_LEVE', 'SEM_IMPACTO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL DEFAULT 'USER',
    "reset_token" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occurrences" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "description" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "accompaniment" TEXT NOT NULL,
    "status" "OccurrenceStaus" NOT NULL,
    "material_damage" TEXT NOT NULL,
    "traffic_impact" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occurrences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "occurrence_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "neighborhood" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "geolocation" TEXT NOT NULL,
    "reference" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "occurrence_id" TEXT NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "is_licensed" BOOLEAN,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "occurrence_id" TEXT NOT NULL,
    "plate" TEXT,
    "model" TEXT,
    "color" TEXT,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_participants" (
    "id" TEXT NOT NULL,
    "occurrence_id" TEXT NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "description" TEXT,
    "participation" "ParticipationRole",
    "status" "IncidentStatus",

    CONSTRAINT "incident_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorities" (
    "id" TEXT NOT NULL,
    "occurrence_id" TEXT NOT NULL,
    "name" TEXT,
    "service_time" TEXT,
    "providences" TEXT,

    CONSTRAINT "authorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drafts" (
    "id" TEXT NOT NULL,
    "form_data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "locations_occurrence_id_key" ON "locations"("occurrence_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident_participants" ADD CONSTRAINT "incident_participants_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorities" ADD CONSTRAINT "authorities_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
