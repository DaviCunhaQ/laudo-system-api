import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  { name: "Alcântaras", displacement_value: 80, identify: "alcantaras-ce" },
  { name: "Ararendá", displacement_value: 350, identify: "ararenda-ce" },
  { name: "Barroquinha", displacement_value: 350, identify: "barroquinha-ce" },
  { name: "Camocim", displacement_value: 350, identify: "camocim-ce" },
  { name: "Cariré", displacement_value: 115, identify: "carire-ce" },
  { name: "Carnaubal", displacement_value: 250, identify: "carnaubal-ce" },
  { name: "Catunda", displacement_value: 350, identify: "catunda-ce" },
  { name: "Chaval", displacement_value: 500, identify: "chaval-ce" },
  { name: "Coreaú", displacement_value: 115, identify: "coreau-ce" },
  { name: "Crateús", displacement_value: 885, identify: "crateus-ce" },
  { name: "Croatá", displacement_value: 350, identify: "croata-ce" },
  { name: "Forquilha", displacement_value: 40, identify: "forquilha-ce" },
  { name: "Frecheirinha", displacement_value: 175, identify: "frecheirinha-ce" },
  { name: "Graça", displacement_value: 175, identify: "graca-ce" },
  { name: "Granja", displacement_value: 250, identify: "granja-ce" },
  { name: "Groaíras", displacement_value: 80, identify: "groairas-ce" },
  { name: "Guaraciaba do Norte", displacement_value: 250, identify: "guaraciabadonorte-ce" },
  { name: "Hidrolândia", displacement_value: 350, identify: "hidrolandia-ce" },
  { name: "Ibiapina", displacement_value: 175, identify: "ibiapina-ce" },
  { name: "Independência", displacement_value: 885, identify: "independencia-ce" },
  { name: "Ipaporanga", displacement_value: 500, identify: "ipaporanga-ce" },
  { name: "Ipu", displacement_value: 250, identify: "ipu-ce" },
  { name: "Ipueiras", displacement_value: 350, identify: "ipueiras-ce" },
  { name: "Martinópole", displacement_value: 175, identify: "martinopole-ce" },
  { name: "Massapê", displacement_value: 40, identify: "massape-ce" },
  { name: "Meruoca", displacement_value: 55, identify: "meruoca-ce" },
  { name: "Monsenhor Tabosa", displacement_value: 500, identify: "mosenhortabosa-ce" },
  { name: "Moraújo", displacement_value: 175, identify: "moraujo-ce" },
  { name: "Mucambo", displacement_value: 115, identify: "mucambo-ce" },
  { name: "Nova Russas", displacement_value: 500, identify: "novarussas-ce" },
  { name: "Novo Oriente", displacement_value: 885, identify: "novooriente-ce" },
  { name: "Pacujá", displacement_value: 175, identify: "pacuja-ce" },
  { name: "Pires Ferreira", displacement_value: 250, identify: "piresferreira-ce" },
  { name: "Poranga", displacement_value: 500, identify: "poranga-ce" },
  { name: "Reriutaba", displacement_value: 175, identify: "reriutaba-ce" },
  { name: "Santa Quitéria", displacement_value: 250, identify: "santaquiteria-ce" },
  { name: "Santana do Acaraú", displacement_value: 115, identify: "santanadoacarau-ce" },
  { name: "São Benedito", displacement_value: 250, identify: "saobenedito-ce" },
  { name: "Senador Sá", displacement_value: 115, identify: "senadorsa-ce" },
  { name: "Sobral", displacement_value: 15, identify: "sobral-ce" },
  { name: "Tamboril", displacement_value: 350, identify: "tamboril-ce" },
  { name: "Tianguá", displacement_value: 250, identify: "tiangua-ce" },
  { name: "Ubajara", displacement_value: 250, identify: "ubajara-ce" },
  { name: "Uruoca", displacement_value: 175, identify: "uruoca-ce" },
  { name: "Varjota", displacement_value: 175, identify: "varjota-ce" }
];

export async function citiesSeed() {
  await Promise.all(
    cities.map(city =>
      prisma.city.upsert({
        where: { identify: city.identify },
        update: {},
        create: city
      })
    )
  );
}
