import { z } from "zod";

export const ServiceOrderSchema = z.object({
  id: z.string().uuid(),
  company: z.string(),
  order_number: z.number().int(),
  order_type: z.string(),
  client_name: z.string(),
  city: z.string(),
  rgi_registration: z.string(),
  opening_date: z.date(),
  service_value: z.number(),
  displacement_value: z.number(),
  contact_name: z.string(),
  contact_number: z.string(),
  property_type: z.string().nullable(),
  property_status: z.string().nullable(),
  cpf: z.string().nullable(),
  cnpj: z.string().nullable(),
  registration_on_system: z.string().nullable(),
  siopi_coincides: z.string().nullable(),
  registration_type: z.string().nullable(),
  registration_date: z.date(),
  averbation_exists: z.boolean(),
  mandatory_documents: z.array(z.string()),
  built_area_presents: z.string().nullable(),
  dwell_registration_compare: z.array(z.string()),
  art_registration_compare: z.array(z.string()),
  dec_registration_compare: z.array(z.string()),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  block: z.string(),
  batch: z.string(),
  complement: z.string(),
  coordenates: z.string(),
  minimal_documentation: z.array(z.string()),
  pls_verifications: z.array(z.string()),
  pls_built_situation: z.string().nullable(),
  total_measured: z.number().int().nullable(),
  more_accurate_informations: z.array(z.string()),
  pci_verifications: z.array(z.string()),
  pci_art_compare: z.array(z.string()),
  project_permit_verifications: z.array(z.string()),
  built_area: z.number().nullable(),
  terrain_area: z.number().nullable(),
  rooms_number: z.number().int().nullable(),
  bathrooms_number: z.number().int().nullable(),
  created_at: z.date(),
  updated_at: z.date()
});

export type ServiceOrderSchema = z.infer<typeof ServiceOrderSchema>

export const DraftSchema = ServiceOrderSchema.partial();

export type DraftSchema = z.infer<typeof DraftSchema>