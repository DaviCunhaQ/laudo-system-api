-- CreateTable
CREATE TABLE "service_orders" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "order_number" INTEGER NOT NULL,
    "order_type" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "rgi_registration" TEXT NOT NULL,
    "opening_date" TIMESTAMP(3) NOT NULL,
    "service_value" DOUBLE PRECISION NOT NULL,
    "displacement_value" DOUBLE PRECISION NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "property_type" TEXT,
    "property_status" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "registration_on_system" TEXT,
    "siopi_coincides" TEXT,
    "registration_type" TEXT,
    "registration_date" TIMESTAMP(3) NOT NULL,
    "averbation_exists" BOOLEAN NOT NULL,
    "mandatory_documents" TEXT[],
    "built_area_presents" TEXT,
    "dwell_registration_compare" TEXT[],
    "art_registration_compare" TEXT[],
    "dec_registration_compare" TEXT[],
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "coordenates" TEXT NOT NULL,
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

    CONSTRAINT "service_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_order_type_fkey" FOREIGN KEY ("order_type") REFERENCES "service_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_city_fkey" FOREIGN KEY ("city") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
