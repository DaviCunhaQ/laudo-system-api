-- AlterTable
ALTER TABLE "drafts" ALTER COLUMN "mandatory_documents" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "dwell_registration_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "art_registration_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "dec_registration_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "minimal_documentation" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pls_verifications" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "more_accurate_informations" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pci_verifications" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pci_art_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "project_permit_verifications" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "service_orders" ALTER COLUMN "mandatory_documents" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "dwell_registration_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "art_registration_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "dec_registration_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "minimal_documentation" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pls_verifications" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "more_accurate_informations" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pci_verifications" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pci_art_compare" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "project_permit_verifications" SET DEFAULT ARRAY[]::TEXT[];
