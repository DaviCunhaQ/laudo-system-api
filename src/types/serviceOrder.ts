import { z } from "zod";

export const ServiceOrderSchema = z.object({
  company: z.string(),
  order_number: z.string(),
  order_type: z.string().uuid(),
  client_name: z.string(),
  city: z.string().uuid(),
  rgi_registration: z.string(),
  service_value: z.number().optional(),
  displacement_value: z.number().optional(),
  opening_date: z.string(),
  contact_name: z.string(),
  contact_number: z.string(),
  property_type: z.string().optional(),
  property_status: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  registration_on_system: z.string().optional(),
  siopi_coincides: z.string().optional(),
  registration_type: z.string().optional(),
  registration_date: z.string().optional(),
  averbation_exists: z.boolean().optional(),
  mandatory_documents: z.array(z.string()).optional(),
  built_area_presents: z.string().optional(),
  dwell_registration_compare: z.array(z.string()).optional(),
  art_registration_compare: z.array(z.string()).optional(),
  dec_registration_compare: z.array(z.string()).optional(),
  cep: z.string(),
  street: z.string(),
  number: z.number(),
  neighborhood: z.string(),
  block: z.string(),
  batch: z.string(),
  complement: z.string(),
  coordenates: z.string(),
  minimal_documentation: z.array(z.string()).optional(),
  pls_verifications: z.array(z.string()).optional(),
  pls_built_situation: z.string().optional(),
  total_measured: z.number().int().optional(),
  more_accurate_informations: z.array(z.string()).optional(),
  mandatory_documents_to_b: z.array(z.string()).optional(),
  pci_verifications: z.array(z.string()).optional(),
  pci_art_compare: z.array(z.string()).optional(),
  project_permit_verifications: z.array(z.string()).optional(),
  built_area: z.number().optional(),
  terrain_area: z.number().optional(),
  rooms_number: z.number().int().optional(),
  bathrooms_number: z.number().int().optional(),
});

export type ServiceOrderSchema = z.infer<typeof ServiceOrderSchema>

export const CreateServiceOrderSchema = z.object({
  company: z.string(),
  order_number: z.string(),
  order_type: z.string().uuid(),
  client_name: z.string(),
  city: z.string().uuid(),
  rgi_registration: z.string(),
  service_value: z.number().optional(),
  displacement_value: z.number().optional(),
  opening_date: z.string(),
  contact_name: z.string(),
  contact_number: z.string(),
  cep: z.string(),
  form_link: z.string()
});

export type CreateServiceOrderSchema = z.infer<typeof CreateServiceOrderSchema>

export const DraftSchema = ServiceOrderSchema.partial();

export type DraftSchema = z.infer<typeof DraftSchema>