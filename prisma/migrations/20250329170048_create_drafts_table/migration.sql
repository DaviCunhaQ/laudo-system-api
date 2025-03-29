-- CreateTable
CREATE TABLE "drafts" (
    "id" TEXT NOT NULL,
    "company" TEXT,
    "order_number" INTEGER,
    "order_type" TEXT,
    "client_name" TEXT,
    "city" TEXT,
    "rgi_registration" TEXT,
    "opening_date" TIMESTAMP(3),
    "service_value" DOUBLE PRECISION,
    "displacement_value" DOUBLE PRECISION,
    "contact_name" TEXT,
    "contact_number" TEXT,
    "property_type" TEXT,
    "property_status" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "registration_on_system" TEXT,
    "siopi_coincides" TEXT,
    "registration_type" TEXT,
    "registration_date" TIMESTAMP(3),
    "averbation_exists" BOOLEAN,
    "mandatory_documents" TEXT[],
    "built_area_presents" TEXT,
    "dwell_registration_compare" TEXT[],
    "art_registration_compare" TEXT[],
    "dec_registration_compare" TEXT[],
    "cep" TEXT,
    "street" TEXT,
    "number" TEXT,
    "neighborhood" TEXT,
    "block" TEXT,
    "batch" TEXT,
    "complement" TEXT,
    "coordenates" TEXT,
    "minimal_documentation" TEXT[],
    "pls_verifications" TEXT[],
    "pls_built_situation" TEXT,
    "total_measured" INTEGER,
    "more_accurate_informations" TEXT[],
    "pci_verifications" TEXT[],
    "pci_art_compare" TEXT[],
    "project_permit_verifications" TEXT[],
    "built_area" DOUBLE PRECISION,
    "terrain_area" DOUBLE PRECISION,
    "rooms_number" INTEGER,
    "bathrooms_number" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_order_type_fkey" FOREIGN KEY ("order_type") REFERENCES "service_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_city_fkey" FOREIGN KEY ("city") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
